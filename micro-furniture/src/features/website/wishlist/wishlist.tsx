import "./wishlist.scss";

import { useMemo, useState } from "react";

import { NavLink, useNavigate } from "react-router";

import { ROUTE_URL } from "../../../routes/constants/routes.const";

import {
  useAddWebsiteCartItemMutation,
  type CartIdentity,
} from "../../../app/redux/website/cart/cart.api";

import {
  useGetCurrentUserQuery,
  type WebsiteUser,
} from "../../../app/redux/website/auth/profile-login.api";

import {
  useGetWishlistQuery,
  useRemoveWishlistItemMutation,
  getGuestCartId,
  type WishlistIdentity,
  type WebsiteWishlistItem,
} from "../../../app/redux/website/wishlist/website-wishlist.api";

import type { IProductData } from "../../store/catalog/interface/product/product.model";

// ============================================================
// TYPES
// ============================================================

interface WishlistProductItem extends WebsiteWishlistItem {
  product?: IProductData;
}

// ============================================================
// CONSTANTS
// ============================================================

const blankImage = "/static/media/img/svg/blank-image.svg";

// ============================================================
// COMPONENT
// ============================================================

const WishlistApp = () => {
  const navigate = useNavigate();

  // ==========================================================
  // CURRENT USER
  // ==========================================================

  const { data: currentUserResponse, isLoading: isUserLoading } =
    useGetCurrentUserQuery();

  const customer: WebsiteUser | null = currentUserResponse?.user ?? null;

  const customerId = customer?.id ? String(customer.id) : null;

  // ==========================================================
  // WISHLIST IDENTITY
  // ==========================================================

  const wishlistIdentity = useMemo<WishlistIdentity | undefined>(() => {
    if (customerId) {
      return {
        customerId,
      };
    }

    const guestCartId = getGuestCartId();

    if (guestCartId) {
      return {
        guestCartId,
      };
    }

    return undefined;
  }, [customerId]);

  // ==========================================================
  // WISHLIST
  // ==========================================================

  const {
    data: wishlistResponse,
    isLoading: isWishlistLoading,
    isFetching: isWishlistFetching,
    isError: isWishlistError,
  } = useGetWishlistQuery(wishlistIdentity as WishlistIdentity, {
    skip: isUserLoading || !wishlistIdentity,
  });

  // ==========================================================
  // REMOVE WISHLIST
  // ==========================================================

  const [removeWishlistItem, { isLoading: isRemoving }] =
    useRemoveWishlistItemMutation();

  const [removingProductId, setRemovingProductId] = useState<string | null>(
    null,
  );

  // ==========================================================
  // ADD TO CART
  // ==========================================================

  const [addWebsiteCartItem, { isLoading: isAddingToBag }] =
    useAddWebsiteCartItemMutation();

  const [movingProductId, setMovingProductId] = useState<string | null>(null);

  // ==========================================================
  // ITEMS
  // ==========================================================

  const items = useMemo<WishlistProductItem[]>(() => {
    return (wishlistResponse?.items ?? []) as WishlistProductItem[];
  }, [wishlistResponse]);

  // ==========================================================
  // REMOVE
  // ==========================================================

  const removeFromWishlist = async (productId: string) => {
    if (!productId || !wishlistIdentity || isRemoving) {
      return;
    }

    try {
      setRemovingProductId(productId);

      await removeWishlistItem({
        ...wishlistIdentity,
        productId,
      }).unwrap();
    } catch (error) {
      console.error("Unable to remove product from wishlist:", error);
    } finally {
      setRemovingProductId(null);
    }
  };

  // ==========================================================
  // MOVE TO BAG
  // ==========================================================

  const moveToBag = async (item: WishlistProductItem) => {
    if (!item.productId || !wishlistIdentity || movingProductId) {
      return;
    }

    const cartIdentity: CartIdentity = {
      ...wishlistIdentity,
    };

    try {
      setMovingProductId(item.productId);

      await addWebsiteCartItem({
        ...cartIdentity,
        productId: item.productId,
        productType: "physical",
        quantity: 1,
      }).unwrap();

      await removeWishlistItem({
        ...wishlistIdentity,
        productId: item.productId,
      }).unwrap();
    } catch (error) {
      console.error("Unable to move product to bag:", error);
    } finally {
      setMovingProductId(null);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (isUserLoading || isWishlistLoading || !wishlistIdentity) {
    return (
      <section className="wishlist-app">
        <div className="container">
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            </div>

            <h5 className="wishlist-empty-title">Loading wishlist...</h5>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (isWishlistError) {
    return (
      <section className="wishlist-app">
        <div className="container">
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <i className="bi bi-exclamation-circle" />
            </div>

            <h5 className="wishlist-empty-title">
              Unable to load your wishlist
            </h5>

            <p className="wishlist-empty-description">
              Something went wrong while loading your saved products.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wishlist-app">
      <div className="container">
        {/* -------------------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------------------- */}

        <div className="wishlist-header">
          <div>
            <h4 className="wishlist-title">My Wishlist</h4>

            <p className="wishlist-count">
              {items.length} {items.length === 1 ? "item" : "items"}
              {isWishlistFetching && (
                <span className="ms-2">
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                </span>
              )}
            </p>
          </div>
        </div>

        {/* -------------------------------------------- */}
        {/* EMPTY WISHLIST */}
        {/* -------------------------------------------- */}

        {items.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <i className="bi bi-heart"></i>
            </div>

            <h5 className="wishlist-empty-title">Your wishlist is empty</h5>

            <p className="wishlist-empty-description">
              Save your favourite products here and come back whenever you're
              ready.
            </p>

            <NavLink
              to={ROUTE_URL.WEBSITE.PRODUCTS}
              className="wishlist-shop-btn"
            >
              Explore Products
            </NavLink>
          </div>
        ) : (
          /* -------------------------------------------- */
          /* WISHLIST PRODUCTS */
          /* -------------------------------------------- */

          <div className="row g-3 g-md-4">
            {items.map((item) => {
              const product = item.product;

              const productId = item.productId;

              const name = product?.name ?? "Product";

              const image = product?.media?.[0]?.url ?? blankImage;

              const price = product?.price?.sellingPrice ?? 0;

              const originalPrice = product?.price?.basePrice ?? 0;

              const discount = product?.price?.discount;

              const isRemovingProduct = removingProductId === productId;

              const isMovingProduct = movingProductId === productId;

              const isBusy =
                isRemovingProduct || isMovingProduct || isAddingToBag;

              return (
                <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                  <div className="wishlist-card">
                    {/* Product Image */}

                    <div className="wishlist-image-wrapper">
                      <NavLink
                        to={`/products/${productId}`}
                        className="text-decoration-none"
                      >
                        <img
                          src={image}
                          alt={name}
                          className="wishlist-image"
                        />
                      </NavLink>

                      {/* Remove */}

                      <button
                        type="button"
                        className="wishlist-remove"
                        onClick={() => removeFromWishlist(productId)}
                        disabled={isBusy}
                        aria-label={`Remove ${name} from wishlist`}
                      >
                        {isRemovingProduct ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          <i className="bi bi-x"></i>
                        )}
                      </button>
                    </div>

                    {/* Product Details */}

                    <div className="wishlist-details">
                      <NavLink
                        to={`/products/${productId}`}
                        className="wishlist-product-name"
                      >
                        {name}
                      </NavLink>

                      {/* Price */}

                      <div className="wishlist-price">
                        <span className="selling-price">
                          ₹ {price.toFixed(2)}
                        </span>

                        {originalPrice > price && (
                          <span className="original-price">
                            ₹ {originalPrice.toFixed(2)}
                          </span>
                        )}

                        {originalPrice > price &&
                          discount?.type === "percentage" &&
                          discount.value != null && (
                            <span className="discount">
                              {discount.value}% OFF
                            </span>
                          )}

                        {originalPrice > price &&
                          discount?.type === "fixed" &&
                          discount.value != null && (
                            <span className="discount">
                              ₹ {discount.value.toFixed(2)} OFF
                            </span>
                          )}
                      </div>

                      {/* Stock */}

                      {product?.inventory?.quantity === 0 && (
                        <div className="out-of-stock">Out of stock</div>
                      )}

                      {/* Move To Bag */}

                      <button
                        type="button"
                        className="move-to-bag-btn"
                        disabled={product?.inventory?.quantity === 0 || isBusy}
                        onClick={() => moveToBag(item)}
                      >
                        {isMovingProduct ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          <i className="bi bi-bag"></i>
                        )}

                        {isMovingProduct ? "Moving..." : "Move to Bag"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistApp;
