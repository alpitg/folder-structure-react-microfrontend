import "./products.scss";

import {
  useAddWebsiteCartItemMutation,
  useGetWebsiteCartQuery,
  type CartIdentity,
} from "../../../app/redux/website/cart/cart.api";

import {
  useGetCurrentUserQuery,
  type WebsiteUser,
} from "../../../app/redux/website/auth/profile-login.api";

import { useEffect, useMemo, useState } from "react";

import {
  useGetProductsQuery,
  websiteProductApi,
} from "../../../app/redux/website/product/website-product.api";

import {
  useAddWishlistItemMutation,
  useGetWishlistQuery,
  useRemoveWishlistItemMutation,
} from "../../../app/redux/website/wishlist/website-wishlist.api";

import { useLocation, useNavigate } from "react-router";

import type { AppDispatch } from "../../../app/store";

import type { IProductData } from "../../store/catalog/interface/product/product.model";

import NotFoundApp from "./not-found/not-found";

import { ROUTE_URL } from "../../../routes/constants/routes.const";

import { addItemToBag } from "../../../app/redux/crm/core/shopping-bag/shopping-bag.slice";

import { useDispatch } from "react-redux";

// ==================================================
// CONSTANTS
// ==================================================

const GUEST_CART_KEY = "website_guest_cart_id";

const PAGE_SIZE = 12;

// ==================================================
// HELPERS
// ==================================================

const getOrCreateGuestCartId = (): string => {
  const existingGuestCartId = localStorage.getItem(GUEST_CART_KEY);

  if (existingGuestCartId) {
    return existingGuestCartId;
  }

  const guestCartId = crypto.randomUUID();

  localStorage.setItem(GUEST_CART_KEY, guestCartId);

  return guestCartId;
};

// ==================================================
// COMPONENT
// ==================================================

const Products = () => {
  // ==================================================
  // VARIABLES
  // ==================================================

  const blankImage = "/static/media/img/svg/blank-image.svg";

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const query = new URLSearchParams(location.search);

  const category = query.get("category");

  // ==================================================
  // PAGINATION
  // ==================================================

  const [page, setPage] = useState(1);

  // ==================================================
  // CUSTOMER
  // ==================================================

  const { data: currentUserResponse, isLoading: isUserLoading } =
    useGetCurrentUserQuery();

  const customer: WebsiteUser | null = currentUserResponse?.user ?? null;

  const customerId = customer?.id ?? null;

  // ==================================================
  // GUEST CART
  // ==================================================

  const [guestCartId, setGuestCartId] = useState<string | null>(null);

  useEffect(() => {
    if (customerId) {
      return;
    }

    const id = getOrCreateGuestCartId();

    setGuestCartId(id);
  }, [customerId]);

  // ==================================================
  // CART IDENTITY
  // ==================================================

  const cartIdentity = useMemo<CartIdentity | undefined>(() => {
    if (customerId) {
      return {
        customerId,
      };
    }

    if (guestCartId) {
      return {
        guestCartId,
      };
    }

    return undefined;
  }, [customerId, guestCartId]);

  // ==================================================
  // CART
  // ==================================================

  const {
    data: cartResponse,
    isLoading: isCartLoading,
    refetch: refetchCart,
  } = useGetWebsiteCartQuery(cartIdentity as CartIdentity, {
    skip: !cartIdentity || isUserLoading,
  });

  // ==================================================
  // ADD CART ITEM
  // ==================================================

  const [addWebsiteCartItem] = useAddWebsiteCartItemMutation();

  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  // ==================================================
  // WISHLIST IDENTITY
  // ==================================================

  const wishlistIdentity = useMemo(() => {
    if (customerId) {
      return {
        customerId: String(customerId),
      };
    }

    if (guestCartId) {
      return {
        guestCartId,
      };
    }

    return undefined;
  }, [customerId, guestCartId]);

  // ==================================================
  // WISHLIST
  // ==================================================

  const { data: wishlistResponse, isLoading: isWishlistLoading } =
    useGetWishlistQuery(wishlistIdentity, {
      skip: !wishlistIdentity || isUserLoading,
    });

  const [addWishlistItem, { isLoading: isAddingWishlistItem }] =
    useAddWishlistItemMutation();

  const [removeWishlistItem, { isLoading: isRemovingWishlistItem }] =
    useRemoveWishlistItemMutation();

  const [wishlistProductId, setWishlistProductId] = useState<string | null>(
    null,
  );

  // ==================================================
  // WISHLIST ITEM MAP
  // ==================================================

  const wishlistItemMap = useMemo(() => {
    const items = wishlistResponse?.items ?? [];

    return new Map(items.map((item) => [item.productId, item]));
  }, [wishlistResponse]);

  // ==================================================
  // WISHLIST TOGGLE
  // ==================================================

  const handleWishlistToggle = async (productId: string) => {
    if (!productId || !wishlistIdentity || wishlistProductId) {
      return;
    }

    const existingWishlistItem = wishlistItemMap.get(productId);

    try {
      setWishlistProductId(productId);

      if (existingWishlistItem) {
        await removeWishlistItem({
          ...wishlistIdentity,
          productId,
        }).unwrap();

        return;
      }

      await addWishlistItem({
        ...wishlistIdentity,
        productId,
      }).unwrap();
    } catch (error) {
      console.error("Unable to update wishlist:", error);
    } finally {
      setWishlistProductId(null);
    }
  };

  // ==================================================
  // PRODUCTS
  // ==================================================

  const {
    data: productsResponse,
    isLoading,
    isFetching,
    isError,
  } = useGetProductsQuery({
    searchText: "",
    categories: category ? [category] : null,
    page,
    pageSize: PAGE_SIZE,
    sort: "newest",
  });

  // ==================================================
  // PREFETCH NEXT PAGE
  // ==================================================

  useEffect(() => {
    dispatch(
      websiteProductApi.util.prefetch(
        "getProducts",
        {
          searchText: "",
          categories: category ? [category] : null,
          page: page + 1,
          pageSize: PAGE_SIZE,
          sort: "newest",
        },
        {
          force: false,
        },
      ),
    );
  }, [dispatch, page, category]);

  // ==================================================
  // PRODUCTS
  // ==================================================

  const products = productsResponse?.items ?? [];

  // ==================================================
  // SERVER CART ITEM MAP
  // ==================================================

  const cartItemMap = useMemo(() => {
    const items = cartResponse?.items ?? [];

    return new Map(items.map((item) => [item.productId, item]));
  }, [cartResponse]);

  // ==================================================
  // CATEGORY FILTER
  // ==================================================

  const filteredProducts = useMemo(() => {
    if (!category) {
      return products;
    }

    return products.filter((product) =>
      product?.categories?.includes(category),
    );
  }, [products, category]);

  // ==================================================
  // QUICK VIEW
  // ==================================================

  const handleQuickView = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  // ==================================================
  // VIEW BAG
  // ==================================================

  const handleViewBag = () => {
    navigate(ROUTE_URL.WEBSITE.CART);
  };

  // ==================================================
  // ADD TO CART
  // ==================================================

  const addToCart = async (product: IProductData) => {
    if (!product?.id || addingProductId) {
      return;
    }

    const existingCartItem = cartItemMap.get(product.id);

    if (existingCartItem) {
      handleViewBag();
      return;
    }

    if (!cartIdentity) {
      return;
    }

    try {
      setAddingProductId(product.id);

      await addWebsiteCartItem({
        ...cartIdentity,
        productId: product.id,
        productType: "physical",
        quantity: 1,
      }).unwrap();

      dispatch(
        addItemToBag({
          id: product.id,
          name: product.name,
          image: product.media?.[0]?.url ?? blankImage,
          price: product.price?.sellingPrice ?? 0,
          quantity: 1,
        }),
      );

      await refetchCart();
    } catch (error) {
      console.error("Unable to add product to cart:", error);
    } finally {
      setAddingProductId(null);
    }
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <section className="products-app container">
      {/* ================================================== */}
      {/* LOADING */}
      {/* ================================================== */}

      {isLoading && (
        <div className="products-loading">
          <div className="spinner-border spinner-border-sm text-dark me-2" />
          Loading products...
        </div>
      )}

      {/* ================================================== */}
      {/* FETCHING */}
      {/* ================================================== */}

      {isFetching && !isLoading && (
        <div className="products-updating">
          <div className="spinner-border spinner-border-sm text-dark me-2" />
          Updating products...
        </div>
      )}

      {/* ================================================== */}
      {/* ERROR */}
      {/* ================================================== */}

      {isError && (
        <div className="products-error">
          <i className="bi bi-exclamation-circle me-2"></i>
          Unable to load products right now.
        </div>
      )}

      {/* ================================================== */}
      {/* PRODUCTS */}
      {/* ================================================== */}

      {!isLoading && !isError && filteredProducts.length > 0 ? (
        <>
          <div className="row g-3 g-md-4">
            {filteredProducts.map((product) => {
              const cartItem = cartItemMap.get(product.id);

              const quantity = cartItem?.quantity ?? 0;

              const isAdding = addingProductId === product.id;

              return (
                <div key={product.id} className="col-6 col-md-4 col-lg-3">
                  <div className="product-card">
                    {/* ================================================== */}
                    {/* IMAGE */}
                    {/* ================================================== */}

                    <div className="product-img">
                      <img
                        loading="lazy"
                        src={
                          product?.media?.[0]?.url
                            ? product.media[0].url
                            : blankImage
                        }
                        alt={product?.name || "Product"}
                        className="product-image"
                      />

                      {/* ================================================== */}
                      {/* NEW BADGE */}
                      {/* ================================================== */}

                      {product?.isNewArrival && (
                        <span className="product-badge">
                          <i className="bi bi-stars"></i>
                          New
                        </span>
                      )}

                      {/* ================================================== */}
                      {/* WISHLIST */}
                      {/* ================================================== */}

                      {(() => {
                        const isWishlisted = wishlistItemMap.has(product.id);
                        const isWishlistUpdating =
                          wishlistProductId === product.id;

                        return (
                          <button
                            type="button"
                            className={`wishlist-btn${
                              isWishlisted ? " active" : ""
                            }`}
                            onClick={() => handleWishlistToggle(product.id)}
                            disabled={
                              isWishlistUpdating ||
                              isWishlistLoading ||
                              isUserLoading ||
                              !wishlistIdentity ||
                              isAddingWishlistItem ||
                              isRemovingWishlistItem
                            }
                            aria-label={
                              isWishlisted
                                ? `Remove ${product?.name} from wishlist`
                                : `Add ${product?.name} to wishlist`
                            }
                            aria-pressed={isWishlisted}
                          >
                            {isWishlistUpdating ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              <i
                                className={
                                  isWishlisted
                                    ? "bi bi-heart-fill"
                                    : "bi bi-heart"
                                }
                              />
                            )}
                          </button>
                        );
                      })()}

                      {/* ================================================== */}
                      {/* PRODUCT ACTIONS */}
                      {/* ================================================== */}

                      <div className="product-actions">
                        {quantity === 0 ? (
                          <button
                            type="button"
                            className="add-to-cart-btn"
                            onClick={() => addToCart(product)}
                            disabled={
                              isAdding ||
                              isUserLoading ||
                              isCartLoading ||
                              !cartIdentity
                            }
                          >
                            {isAdding ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              <i className="bi bi-bag-plus"></i>
                            )}

                            {isAdding ? "Adding..." : "Add to Bag"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="view-cart-btn"
                            onClick={handleViewBag}
                          >
                            <i className="bi bi-check2"></i>
                            Added to Bag
                          </button>
                        )}

                        {/* ================================================== */}
                        {/* QUICK VIEW */}
                        {/* ================================================== */}

                        <button
                          type="button"
                          className="quick-view-btn"
                          onMouseEnter={() =>
                            dispatch(
                              websiteProductApi.util.prefetch(
                                "getProductDetail",
                                product.id,
                                {
                                  force: false,
                                },
                              ),
                            )
                          }
                          onClick={() => handleQuickView(product.id)}
                        >
                          <i className="bi bi-eye"></i>
                          View
                        </button>
                      </div>
                    </div>

                    {/* ================================================== */}
                    {/* PRODUCT DETAILS */}
                    {/* ================================================== */}

                    <div className="product-content">
                      <h6 className="product-name">{product?.name}</h6>

                      {product?.description && (
                        <p className="product-description">
                          {product.description}
                        </p>
                      )}

                      {/* ================================================== */}
                      {/* PRICE */}
                      {/* ================================================== */}

                      <div className="product-price">
                        <span className="sale-price">
                          ₹
                          {(product?.price?.sellingPrice ?? 0).toLocaleString(
                            "en-IN",
                          )}
                        </span>

                        {product?.price?.basePrice &&
                          product.price.basePrice >
                            (product?.price?.sellingPrice ?? 0) && (
                            <>
                              <span className="mrp-price">
                                ₹
                                {product.price.basePrice.toLocaleString(
                                  "en-IN",
                                )}
                              </span>

                              {product?.price?.discount?.type ===
                                "percentage" &&
                                product.price.discount.value != null && (
                                  <span className="discount">
                                    {product.price.discount.value}% OFF
                                  </span>
                                )}

                              {product?.price?.discount?.type === "fixed" &&
                                product.price.discount.value != null && (
                                  <span className="discount">
                                    ₹
                                    {product.price.discount.value.toLocaleString(
                                      "en-IN",
                                    )}
                                    <span> OFF</span>
                                  </span>
                                )}
                            </>
                          )}
                      </div>

                      {/* ================================================== */}
                      {/* RATING */}
                      {/* ================================================== */}

                      {product?.reviews > 0 && (
                        <div className="product-rating">
                          <span className="rating-value">
                            {product?.rating ?? 0}
                            <i className="bi bi-star-fill"></i>
                          </span>

                          <span className="rating-divider">|</span>

                          <span>{product?.reviews ?? 0} reviews</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================================================== */}
          {/* PAGINATION */}
          {/* ================================================== */}

          <div className="pagination-wrapper">
            <button
              type="button"
              className="pagination-btn"
              disabled={page === 1 || isFetching}
              onClick={() => setPage((previous) => previous - 1)}
            >
              <i className="bi bi-chevron-left"></i>
              Previous
            </button>

            <span className="pagination-page">Page {page}</span>

            <button
              type="button"
              className="pagination-btn"
              disabled={products.length < PAGE_SIZE || isFetching}
              onClick={() => setPage((previous) => previous + 1)}
            >
              Next
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      ) : (
        !isLoading && !isError && <NotFoundApp />
      )}
    </section>
  );
};

export default Products;
