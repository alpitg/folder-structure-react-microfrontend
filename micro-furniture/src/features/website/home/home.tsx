import "./home.scss";

import { NavLink, useNavigate } from "react-router";

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

import { GetEnvConfig } from "../../../app.config";

import type { IProductData } from "../../store/catalog/interface/product/product.model";

import { ROUTE_URL } from "../../../routes/constants/routes.const";

import ShopByCategoryApp from "./shop-by-category/shop-by-category";

import { addItemToBag } from "../../../app/redux/crm/core/shopping-bag/shopping-bag.slice";

import { useDispatch } from "react-redux";

import { useGetProductsQuery } from "../../../app/redux/website/product/website-product.api";

const blankImage = "/static/media/img/svg/blank-image.svg";

const GUEST_CART_KEY = "website_guest_cart_id";

// ==================================================
// GUEST CART
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

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appSettings = GetEnvConfig();

  // ==================================================
  // OFFERS
  // ==================================================

  const offers = [
    {
      icon: "bi-lightning-charge-fill",
      title: "FLAT 50% OFF",
      subtitle: "On selected styles",
    },
    {
      icon: "bi-truck",
      title: "FREE SHIPPING",
      subtitle: "On orders above ₹999",
    },
    {
      icon: "bi-percent",
      title: "EXTRA 10% OFF",
      subtitle: "Use code: Artisan10",
    },
  ];

  // ==================================================
  // CURRENT USER
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
      setGuestCartId(null);
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
  // ADD TO CART
  // ==================================================

  const [addWebsiteCartItem] = useAddWebsiteCartItemMutation();

  /**
   * IMPORTANT:
   *
   * This stores only the product currently being added.
   *
   * Therefore:
   *
   * Product A -> Adding...
   * Product B -> remains enabled
   * Product C -> remains enabled
   */
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  // ==================================================
  // PRODUCTS
  // ==================================================

  const { data: productsResponse, isLoading } = useGetProductsQuery({
    searchText: "",
    page: 1,
    pageSize: 12,
  });

  const products = productsResponse?.items ?? [];

  // ==================================================
  // CART ITEM MAP
  // ==================================================

  const cartItemMap = useMemo(() => {
    const items = cartResponse?.items ?? [];

    return new Map(items.map((item) => [item.productId, item]));
  }, [cartResponse]);

  // ==================================================
  // ADD TO BAG
  // ==================================================

  const handleAddToBag = async (
    product: IProductData,
    event: React.MouseEvent,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!product?.id) {
      return;
    }

    /**
     * Prevent multiple simultaneous additions
     * from this component.
     */
    if (addingProductId) {
      return;
    }

    // ==================================================
    // SERVER CART CHECK
    // ==================================================

    const existingCartItem = cartItemMap.get(product.id);

    if (existingCartItem) {
      navigate(ROUTE_URL.WEBSITE.CART);
      return;
    }

    // ==================================================
    // CART IDENTITY CHECK
    // ==================================================

    if (!cartIdentity) {
      console.error("Cart identity is not available.");
      return;
    }

    try {
      // ==================================================
      // ONLY CURRENT PRODUCT IS LOADING
      // ==================================================

      setAddingProductId(product.id);

      // ==================================================
      // ADD TO SERVER CART
      // ==================================================

      await addWebsiteCartItem({
        ...cartIdentity,
        productId: product.id,
        productType: "physical",
        quantity: 1,
      }).unwrap();

      // ==================================================
      // KEEP REDUX BAG IN SYNC
      // ==================================================

      dispatch(
        addItemToBag({
          id: product.id,
          name: product.name,
          image: product.media?.[0]?.url ?? blankImage,
          price: product.price?.sellingPrice ?? 0,
          quantity: 1,
        }),
      );

      // ==================================================
      // REFRESH SERVER CART
      // ==================================================

      await refetchCart();
    } catch (error) {
      console.error("Unable to add product to cart:", error);
    } finally {
      // ==================================================
      // ONLY CURRENT PRODUCT STOPS LOADING
      // ==================================================

      setAddingProductId(null);
    }
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <main className="home-page">
      {/* ================================================== */}
      {/* PROMO STRIP */}
      {/* ================================================== */}

      <section className="home-offer-strip">
        <div className="home-offer-track">
          {offers.map((offer) => (
            <div className="home-offer-item" key={offer.title}>
              <i className={`bi ${offer.icon}`} />

              <div>
                <strong>{offer.title}</strong>
                <span>{offer.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <section className="home-hero">
        <div className="home-hero-content">
          <span>BIG FASHION SALE</span>

          <h1>Styles you love.</h1>

          <p>Discover the latest trends at irresistible prices.</p>

          <button
            type="button"
            className="home-hero-btn"
            onClick={() => navigate(ROUTE_URL.WEBSITE.PRODUCTS)}
          >
            Shop Now
            <i className="bi bi-arrow-right" />
          </button>
        </div>

        <div className="home-hero-decoration">
          <span>UP TO</span>
          <strong>70%</strong>
          <small>OFF</small>
        </div>
      </section>

      {/* ================================================== */}
      {/* CATEGORIES */}
      {/* ================================================== */}

      <ShopByCategoryApp />

      {/* ================================================== */}
      {/* DEAL BANNER */}
      {/* ================================================== */}

      <section className="home-deal-banner">
        <div>
          <span>LIMITED TIME OFFER</span>
          <h2>Up to 60% off</h2>
          <p>Fresh styles. Better prices.</p>
        </div>

        <NavLink
          to={ROUTE_URL.WEBSITE.PRODUCTS}
          type="button"
          className="home-hero-btn"
        >
          <button type="button">
            Shop Deals
            <i className="bi bi-arrow-right" />
          </button>
        </NavLink>
      </section>

      {/* ================================================== */}
      {/* PRODUCTS */}
      {/* ================================================== */}

      <section className="home-section home-products-section">
        <div className="home-section-header">
          <div>
            <span>TRENDING NOW</span>
            <h2>Latest Styles</h2>
          </div>

          <button
            type="button"
            onClick={() => navigate(ROUTE_URL.WEBSITE.PRODUCTS)}
          >
            View All <i className="bi bi-arrow-right" />
          </button>
        </div>

        {/* ================================================== */}
        {/* PRODUCTS LOADING */}
        {/* ================================================== */}

        {isLoading ? (
          <div className="home-product-loading">
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            <span>Loading products...</span>
          </div>
        ) : (
          <div className="home-products">
            {products.map((product: IProductData) => {
              const image = product?.media?.[0]?.url ?? blankImage;

              const sellingPrice = product?.price?.sellingPrice ?? 0;

              const mrp = product?.price?.basePrice ?? 0;

              const discount = product?.price?.discount;

              const isInBag = cartItemMap.has(product?.id);

              const isAdding = addingProductId === product?.id;

              return (
                <article className="home-product-card" key={product?.id}>
                  {/* ================================================== */}
                  {/* PRODUCT IMAGE */}
                  {/* ================================================== */}

                  <div className="home-product-image">
                    <img src={image} alt={product?.name || "Product"} />

                    {/* DISCOUNT */}

                    {mrp > sellingPrice && discount && (
                      <>
                        {discount.type === "percentage" &&
                          discount.value != null && (
                            <span className="home-product-discount">
                              {discount.value}% OFF
                            </span>
                          )}

                        {discount.type === "fixed" &&
                          discount.value != null && (
                            <span className="home-product-discount">
                              ₹{discount.value.toLocaleString("en-IN")} OFF
                            </span>
                          )}
                      </>
                    )}

                    {/* WISHLIST */}

                    <button
                      type="button"
                      className="home-product-wishlist"
                      aria-label="Add to wishlist"
                    >
                      <i className="bi bi-heart" />
                    </button>
                  </div>

                  {/* ================================================== */}
                  {/* PRODUCT CONTENT */}
                  {/* ================================================== */}

                  <div className="home-product-content">
                    <span className="home-product-brand">
                      By {appSettings?.name}
                    </span>

                    <h3>{product?.name}</h3>

                    {/* PRICE */}

                    <div className="home-product-price">
                      <strong>₹{sellingPrice.toLocaleString("en-IN")}</strong>

                      {mrp > sellingPrice && (
                        <span>₹{mrp.toLocaleString("en-IN")}</span>
                      )}

                      {mrp > sellingPrice &&
                        discount?.type === "percentage" &&
                        discount.value != null && (
                          <em>{discount.value}% off</em>
                        )}

                      {mrp > sellingPrice &&
                        discount?.type === "fixed" &&
                        discount.value != null && (
                          <em>₹{discount.value.toLocaleString("en-IN")} off</em>
                        )}
                    </div>

                    {/* ================================================== */}
                    {/* ADD TO BAG */}
                    {/* ================================================== */}

                    <button
                      type="button"
                      className={`home-product-bag ${isInBag ? "added" : ""}`}
                      onClick={(event) => handleAddToBag(product, event)}
                      disabled={
                        /**
                         * IMPORTANT:
                         *
                         * Do NOT use isCartLoading here
                         * for every product.
                         *
                         * Otherwise a cart refresh can
                         * disable all product buttons.
                         *
                         * Only the product currently being
                         * added is disabled.
                         */
                        isAdding || isUserLoading || !cartIdentity
                      }
                    >
                      {isAdding ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        <i
                          className={`bi ${isInBag ? "bi-check2" : "bi-bag"}`}
                        />
                      )}

                      <span>
                        {isAdding
                          ? "Adding..."
                          : isInBag
                            ? "Added to Bag"
                            : "Add to Bag"}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ================================================== */}
        {/* EMPTY */}
        {/* ================================================== */}

        {!isLoading && products.length === 0 && (
          <div className="home-empty">
            <i className="bi bi-bag" />
            <span>No products available</span>
          </div>
        )}
      </section>

      {/* ================================================== */}
      {/* TRUST FEATURES */}
      {/* ================================================== */}

      <section className="home-features">
        <div className="home-feature">
          <i className="bi bi-truck" />

          <div>
            <strong>Free Shipping</strong>
            <span>On orders above ₹999</span>
          </div>
        </div>

        <div className="home-feature">
          <i className="bi bi-arrow-repeat" />

          <div>
            <strong>Easy Returns</strong>
            <span>Hassle-free returns</span>
          </div>
        </div>

        <div className="home-feature">
          <i className="bi bi-shield-check" />

          <div>
            <strong>Secure Payments</strong>
            <span>100% secure checkout</span>
          </div>
        </div>

        <div className="home-feature">
          <i className="bi bi-headset" />

          <div>
            <strong>24/7 Support</strong>
            <span>We're here to help</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
