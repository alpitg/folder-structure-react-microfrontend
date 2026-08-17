import "./product-details.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useNavigate, useParams } from "react-router";

import type { AppState } from "../../../../app/store";
import { GetEnvConfig } from "../../../../app.config";
import { ROUTE_URL } from "../../../../routes/constants/routes.const";

import {
  useAddWebsiteCartItemMutation,
  useGetWebsiteCartQuery,
  type CartIdentity,
} from "../../../../app/redux/website/cart/cart.api";

import {
  useGetCurrentUserQuery,
  type WebsiteUser,
} from "../../../../app/redux/website/auth/profile-login.api";

import { addItemToBag } from "../../../../app/redux/crm/core/shopping-bag/shopping-bag.slice";

import { useGetProductDetailQuery } from "../../../../app/redux/website/product/website-product.api";

import {
  useAddWishlistItemMutation,
  useGetWishlistQuery,
  useRemoveWishlistItemMutation,
} from "../../../../app/redux/website/wishlist/website-wishlist.api";

// ============================================================
// CONSTANTS
// ============================================================

const blankImage = "/static/media/img/svg/blank-image.svg";

const GUEST_CART_KEY = "website_guest_cart_id";

// ============================================================
// GUEST CART
// ============================================================

const getOrCreateGuestCartId = (): string => {
  const existingGuestCartId = localStorage.getItem(GUEST_CART_KEY);

  if (existingGuestCartId) {
    return existingGuestCartId;
  }

  const guestCartId = crypto.randomUUID();

  localStorage.setItem(GUEST_CART_KEY, guestCartId);

  return guestCartId;
};

// ============================================================
// COMPONENT
// ============================================================

const ProductDetails = () => {
  // ==================================================
  // VARIABLES
  // ==================================================

  const appSettings = GetEnvConfig();

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // ==================================================
  // STATE
  // ==================================================

  const [selectedImage, setSelectedImage] = useState(0);

  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const [pincode, setPincode] = useState("");

  const [deliveryChecked, setDeliveryChecked] = useState(false);

  /*
   * Mobile sticky CTA visibility.
   */
  const [showMobileStickyActions, setShowMobileStickyActions] = useState(true);

  /*
   * Reference to normal Add to Bag / Wishlist section.
   */
  const productActionsRef = useRef<HTMLDivElement | null>(null);

  /*
   * Product currently being added to cart.
   */
  const [isAddingToBag, setIsAddingToBag] = useState(false);

  /*
   * Product currently being updated in wishlist.
   */
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);

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
    /*
     * Logged-in customer does not need guest cart identity.
     */
    if (customerId) {
      setGuestCartId(null);

      return;
    }

    /*
     * Create guest cart ID only for guests.
     */
    const id = getOrCreateGuestCartId();

    setGuestCartId(id);
  }, [customerId]);

  // ==================================================
  // CART IDENTITY
  // ==================================================

  const cartIdentity = useMemo<CartIdentity | undefined>(() => {
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
  // ADD CART ITEM API
  // ==================================================

  const [addWebsiteCartItem] = useAddWebsiteCartItemMutation();

  // ==================================================
  // CART ITEM MAP
  // ==================================================

  /*
   * IMPORTANT:
   *
   * The server cart is now the source of truth.
   *
   * Previously ProductDetails was checking:
   *
   *     state.core.shoppingBag.items
   *
   * That can become stale when:
   *
   * - the page is refreshed
   * - the cart is changed from another page
   * - the user logs in
   * - a guest cart is restored
   *
   * We therefore use the API cart here.
   */
  const cartItemMap = useMemo(() => {
    const items = cartResponse?.items ?? [];

    return new Map(items.map((item) => [item.productId, item]));
  }, [cartResponse]);

  // ==================================================
  // PRODUCT
  // ==================================================

  const {
    data: productsResponse,
    isLoading: isProductLoading,
    isError,
  } = useGetProductDetailQuery(id ?? "");

  const productsFromStore = useSelector(
    (state: AppState) => state.website.websiteProducts.websiteProductDetail,
  );

  const product = useMemo(() => {
    return productsFromStore || productsResponse;
  }, [productsFromStore, productsResponse]);

  // ==================================================
  // PRODUCT CART STATUS
  // ==================================================

  /*
   * This is the important fix.
   *
   * Product is considered "in bag" ONLY when it exists
   * in the server cart.
   */
  const cartItem = useMemo(() => {
    if (!product?.id) {
      return undefined;
    }

    return cartItemMap.get(product.id);
  }, [cartItemMap, product?.id]);

  const isInBag = Boolean(cartItem);

  const quantityInBag = cartItem?.quantity ?? 0;

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

  const {
    data: wishlistResponse,
    isLoading: isWishlistLoading,
    refetch: refetchWishlist,
  } = useGetWishlistQuery(wishlistIdentity!, {
    skip: !wishlistIdentity || isUserLoading,
  });

  // ==================================================
  // WISHLIST MUTATIONS
  // ==================================================

  const [addWishlistItem] = useAddWishlistItemMutation();

  const [removeWishlistItem] = useRemoveWishlistItemMutation();

  // ==================================================
  // CURRENT PRODUCT WISHLIST STATUS
  // ==================================================

  const isWishlisted = useMemo(() => {
    if (!product?.id) {
      return false;
    }

    const items = wishlistResponse?.items ?? [];

    return items.some((item) => item.productId === product.id);
  }, [wishlistResponse, product?.id]);

  // ==================================================
  // MOBILE STICKY ACTION OBSERVER
  // ==================================================

  useEffect(() => {
    if (!productActionsRef.current) {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 767px)");

    if (!mediaQuery.matches) {
      setShowMobileStickyActions(false);

      return;
    }

    const actionElement = productActionsRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileStickyActions(!entry.isIntersecting);
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(actionElement);

    return () => {
      observer.disconnect();
    };
  }, [product]);

  // ==================================================
  // RESPONSIVE MEDIA QUERY
  // ==================================================

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        setShowMobileStickyActions(false);
      } else {
        setShowMobileStickyActions(true);
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // ==================================================
  // LOADING
  // ==================================================

  if (isProductLoading) {
    return (
      <section className="product-details-app">
        <div className="product-page-container">
          <div className="product-page-state">
            <div className="product-state-icon">
              <i className="bi bi-hourglass-split"></i>
            </div>

            <h4>Loading product...</h4>

            <p>Please wait while we load the product details.</p>
          </div>
        </div>
      </section>
    );
  }

  // ==================================================
  // NOT FOUND
  // ==================================================

  if (isError || !product) {
    return (
      <section className="product-details-app">
        <div className="product-page-container">
          <div className="product-page-state">
            <div className="product-state-icon">
              <i className="bi bi-bag-x"></i>
            </div>

            <h4>Product not found</h4>

            <p>
              The product you're looking for may have been removed or is
              unavailable.
            </p>

            <button
              type="button"
              className="product-dark-btn"
              onClick={() => navigate(ROUTE_URL.WEBSITE.PRODUCTS)}
            >
              <i className="bi bi-arrow-left"></i>

              <span>Back to Products</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ==================================================
  // IMAGES
  // ==================================================

  const productImages =
    product?.media?.map((mediaItem) => mediaItem?.url).filter(Boolean) ?? [];

  const images = productImages.length > 0 ? productImages : [blankImage];

  /*
   * Prevent invalid selected image index if product data changes.
   */
  const safeSelectedImage = selectedImage >= images.length ? 0 : selectedImage;

  const activeImage = images[safeSelectedImage] || blankImage;

  // ==================================================
  // PRICING
  // ==================================================

  const sellingPrice = Number(product.price?.sellingPrice ?? 0);

  const originalPrice = Number(
    product.price?.basePrice ?? product.price?.sellingPrice ?? sellingPrice,
  );

  const discountPercentage =
    originalPrice > sellingPrice
      ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
      : 0;

  // ==================================================
  // ADD TO BAG
  // ==================================================

  const addToBag = async () => {
    if (!product?.id) {
      return;
    }

    /*
     * Do not allow duplicate requests.
     */
    if (isAddingToBag) {
      return;
    }

    /*
     * If cart is already loading, wait until we know
     * whether this product is already present.
     */
    if (isCartLoading) {
      return;
    }

    /*
     * SERVER CART CHECK
     *
     * This is the key fix.
     */
    const existingCartItem = cartItemMap.get(product.id);

    if (existingCartItem) {
      navigate(ROUTE_URL.WEBSITE.CART);

      return;
    }

    /*
     * Need a valid cart identity.
     */
    if (!cartIdentity) {
      console.error("Cart identity is not available.");

      return;
    }

    try {
      setIsAddingToBag(true);

      /*
       * Add to server cart.
       */
      await addWebsiteCartItem({
        ...cartIdentity,
        productId: product.id,
        productType: "physical",
        quantity: 1,
      }).unwrap();

      /*
       * Keep existing Redux shopping bag synchronized.
       *
       * IMPORTANT:
       * This is no longer used to decide whether the
       * product is already in the cart.
       */
      dispatch(
        addItemToBag({
          id: product.id,
          name: product.name,
          image: images[0] ?? blankImage,
          price: sellingPrice,
          quantity: 1,
        }),
      );

      /*
       * Refresh server cart so UI immediately changes
       * from "Add to Bag" to "Go to Bag".
       */
      await refetchCart();
    } catch (error) {
      console.error("Unable to add product to cart:", error);
    } finally {
      setIsAddingToBag(false);
    }
  };

  // ==================================================
  // WISHLIST TOGGLE
  // ==================================================

  const toggleWishlist = async (event?: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    event?.stopPropagation();

    if (!product?.id) {
      return;
    }

    if (isUpdatingWishlist) {
      return;
    }

    if (isWishlistLoading) {
      return;
    }

    if (!wishlistIdentity) {
      console.error("Wishlist identity is not available.");

      return;
    }

    try {
      setIsUpdatingWishlist(true);

      if (isWishlisted) {
        /*
         * Remove existing wishlist item.
         */
        await removeWishlistItem({
          ...wishlistIdentity,
          productId: product.id,
        }).unwrap();
      } else {
        /*
         * Add product to wishlist.
         */
        await addWishlistItem({
          ...wishlistIdentity,
          productId: product.id,
        }).unwrap();
      }

      /*
       * Refresh wishlist from server.
       *
       * This keeps every wishlist button on this page
       * synchronized.
       */
      await refetchWishlist();
    } catch (error) {
      console.error("Unable to update wishlist:", error);
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  // ==================================================
  // IMAGE NAVIGATION
  // ==================================================

  const showPreviousImage = () => {
    setSelectedImage((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const showNextImage = () => {
    setSelectedImage((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  // ==================================================
  // DELIVERY
  // ==================================================

  const checkDelivery = () => {
    if (/^\d{6}$/.test(pincode)) {
      setDeliveryChecked(true);

      return;
    }

    setDeliveryChecked(false);
  };

  // ==================================================
  // COLORS
  // ==================================================

  const colors =
    product?.variations?.[0]?.values
      ?.split(",")
      .map((color) => color.trim())
      .filter(Boolean) ?? [];

  // ==================================================
  // WISHLIST BUTTON STATE
  // ==================================================

  const wishlistButtonDisabled =
    isUpdatingWishlist ||
    isWishlistLoading ||
    isUserLoading ||
    !wishlistIdentity;

  // ==================================================
  // CART BUTTON STATE
  // ==================================================

  const cartButtonDisabled =
    isAddingToBag || isCartLoading || isUserLoading || !cartIdentity;

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <section className="product-details-app">
      <div className="product-page-container">
        {/* ==================================================
            BREADCRUMB
        ================================================== */}

        <nav className="product-breadcrumb" aria-label="breadcrumb">
          <button
            type="button"
            onClick={() => navigate(ROUTE_URL.WEBSITE.PRODUCTS)}
          >
            Products
          </button>

          <i className="bi bi-chevron-right"></i>

          <span>{product.name}</span>
        </nav>

        {/* ==================================================
            PRODUCT
        ================================================== */}

        <div className="row product-layout g-4">
          {/* ==================================================
              GALLERY
          ================================================== */}

          <div className="col-lg-7">
            <div className="product-gallery-layout">
              {/* Desktop thumbnails */}

              {images.length > 0 && (
                <div className="product-thumbnails">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={`${image}-${index}`}
                      className={`product-thumbnail ${
                        safeSelectedImage === index ? "active" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                      aria-label={`View product image ${index + 1}`}
                    >
                      <img
                        src={image ?? blankImage}
                        alt={`${product.name} ${index + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}

              <div className="product-main-image-wrapper">
                <button
                  type="button"
                  className="product-main-image"
                  onClick={() => setIsImageViewerOpen(true)}
                  aria-label="Open product image viewer"
                >
                  <img src={activeImage} alt={product.name} loading="eager" />

                  <span className="image-zoom-hint">
                    <i className="bi bi-arrows-fullscreen"></i>

                    <span>View</span>
                  </span>
                </button>

                {/* New badge */}

                {product.isNewArrival && (
                  <span className="product-new-badge">
                    <i className="bi bi-stars"></i>

                    <span>New In</span>
                  </span>
                )}

                {/* Image wishlist */}

                <button
                  type="button"
                  className={`wishlist-btn ${
                    isWishlisted ? "active" : ""
                  }`}
                  onClick={toggleWishlist}
                  disabled={wishlistButtonDisabled}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  {isUpdatingWishlist ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className={
                        isWishlisted ? "bi bi-heart-fill" : "bi bi-heart"
                      }
                    ></i>
                  )}
                </button>

                {/* Image navigation */}

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="gallery-nav gallery-prev"
                      onClick={showPreviousImage}
                      aria-label="Previous image"
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>

                    <button
                      type="button"
                      className="gallery-nav gallery-next"
                      onClick={showNextImage}
                      aria-label="Next image"
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </>
                )}

                <div className="gallery-counter">
                  {safeSelectedImage + 1} / {images.length}
                </div>
              </div>
            </div>

            {/* Mobile thumbnails */}

            {images.length > 1 && (
              <div className="mobile-product-thumbnails">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={`mobile-${image}-${index}`}
                    className={`product-thumbnail ${
                      safeSelectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <img
                      src={image ?? blankImage}
                      alt={`${product.name} ${index + 1}`}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ==================================================
              PRODUCT INFORMATION
          ================================================== */}

          <div className="col-lg-5">
            <div className="product-information">
              {/* Brand */}

              <div className="product-brand">
                By {appSettings?.name || "Artisan Studios"}
              </div>

              {/* Title */}

              <div className="product-title-row">
                <div className="d-grid">
                  <h1>{product.name}</h1>

                  <p>{product.description}</p>
                </div>

                <button
                  type="button"
                  className={`mobile-title-wishlist ${
                    isWishlisted ? "active" : ""
                  }`}
                  onClick={toggleWishlist}
                  disabled={wishlistButtonDisabled}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  {isUpdatingWishlist ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className={
                        isWishlisted ? "bi bi-heart-fill" : "bi bi-heart"
                      }
                    ></i>
                  )}
                </button>
              </div>

              {/* New */}

              {product.isNewArrival && (
                <span className="desktop-new-badge">
                  <i className="bi bi-stars"></i>

                  <span>New</span>
                </span>
              )}

              {/* Rating */}

              <div className="product-rating-row">
                {product?.rating ? (
                  <div className="product-rating">
                    <span>
                      {product?.rating?.toFixed
                        ? product.rating.toFixed(1)
                        : product.rating}
                    </span>

                    <i className="bi bi-star-fill"></i>
                  </div>
                ) : null}

                {product?.reviews > 0 && (
                  <>
                    <span className="rating-separator">|</span>

                    <span className="review-count">
                      {product.reviews} Reviews
                    </span>
                  </>
                )}

                <span className="stock-status">
                  <i className="bi bi-check-circle-fill"></i>

                  <span>In Stock</span>
                </span>
              </div>

              <div className="product-info-divider"></div>

              {/* ==================================================
                  PRICING
              ================================================== */}

              <div className="product-pricing">
                <div className="product-price-row">
                  <span className="product-selling-price">
                    ₹{sellingPrice.toLocaleString("en-IN")}
                  </span>

                  {originalPrice > sellingPrice && (
                    <span className="product-mrp">
                      MRP ₹{originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}

                  {discountPercentage > 0 && (
                    <span className="product-discount">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <div className="tax-message">
                  <i className="bi bi-check-circle-fill"></i>

                  <span>Inclusive of all taxes</span>
                </div>
              </div>

              {/* ==================================================
                  COLOR
              ================================================== */}

              {colors.length > 0 && (
                <div className="product-option">
                  <div className="option-title">
                    <strong>Color</strong>

                    <span>Select</span>
                  </div>

                  <div className="product-colors">
                    {colors.map((color, index) => (
                      <button
                        type="button"
                        key={`${color}-${index}`}
                        className={`color-option ${
                          index === 0 ? "selected" : ""
                        }`}
                        style={{
                          backgroundColor: color,
                        }}
                        aria-label={`Select ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ==================================================
                  NORMAL ACTIONS
              ================================================== */}

              <div ref={productActionsRef} className="product-actions-area">
                {isInBag ? (
                  <button
                    type="button"
                    className="view-cart-btn"
                    onClick={() => navigate(ROUTE_URL.WEBSITE.CART)}
                    disabled={isCartLoading}
                  >
                    {quantityInBag > 1
                      ? `Go to Bag (${quantityInBag})`
                      : "Go to Bag"}

                    <i className="bi bi-arrow-right"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="add-to-cart-btn"
                    onClick={addToBag}
                    disabled={cartButtonDisabled}
                  >
                    {isAddingToBag ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      <i className="bi bi-bag-plus"></i>
                    )}

                    <span>{isAddingToBag ? "Adding..." : "Add to Bag"}</span>
                  </button>
                )}

                <button
                  type="button"
                  className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
                  onClick={toggleWishlist}
                  disabled={wishlistButtonDisabled}
                >
                  {isUpdatingWishlist ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className={
                        isWishlisted ? "bi bi-heart-fill" : "bi bi-heart"
                      }
                    ></i>
                  )}

                  <span>{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
                </button>
              </div>

              {/* ==================================================
                  DELIVERY
              ================================================== */}

              <div className="delivery-section">
                <div className="section-heading">
                  <i className="bi bi-truck"></i>

                  <h3>Delivery Options</h3>
                </div>

                <div className="delivery-input">
                  <i className="bi bi-geo-alt"></i>

                  <input
                    type="text"
                    value={pincode}
                    maxLength={6}
                    inputMode="numeric"
                    placeholder="Enter pincode"
                    onChange={(event) => {
                      setPincode(event.target.value.replace(/\D/g, ""));

                      setDeliveryChecked(false);
                    }}
                  />

                  <button type="button" onClick={checkDelivery}>
                    CHECK
                  </button>
                </div>

                {deliveryChecked ? (
                  <div className="delivery-success">
                    <i className="bi bi-check-circle-fill"></i>

                    <div>
                      <strong>Delivery available</strong>

                      <span>Get it delivered by 12 Aug</span>
                    </div>
                  </div>
                ) : (
                  <p className="delivery-helper">
                    Enter your pincode to check availability and estimated
                    delivery.
                  </p>
                )}
              </div>

              {/* ==================================================
                  PERKS
              ================================================== */}

              <div className="product-perks">
                <div className="product-perk">
                  <div className="perk-icon">
                    <i className="bi bi-truck"></i>
                  </div>

                  <div>
                    <strong>Fast Delivery</strong>

                    <span>Quick doorstep delivery</span>
                  </div>
                </div>

                <div className="product-perk">
                  <div className="perk-icon">
                    <i className="bi bi-arrow-repeat"></i>
                  </div>

                  <div>
                    <strong>Easy Returns</strong>

                    <span>Hassle-free returns</span>
                  </div>
                </div>

                <div className="product-perk">
                  <div className="perk-icon">
                    <i className="bi bi-shield-check"></i>
                  </div>

                  <div>
                    <strong>100% Original</strong>

                    <span>Authentic products</span>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  OFFERS
              ================================================== */}

              <div className="product-offers">
                <div className="section-heading">
                  <i className="bi bi-tag"></i>

                  <h3>Best Offers</h3>
                </div>

                <div className="offer-card">
                  <div className="offer-icon">
                    <i className="bi bi-percent"></i>
                  </div>

                  <div>
                    <strong>Special offer</strong>

                    <p>Get additional discounts on selected payment methods.</p>
                  </div>
                </div>

                <div className="offer-card">
                  <div className="offer-icon">
                    <i className="bi bi-credit-card"></i>
                  </div>

                  <div>
                    <strong>Bank offer</strong>

                    <p>
                      Get instant discount on eligible credit and debit cards.
                    </p>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  DESCRIPTION
              ================================================== */}

              {product.description && (
                <div className="product-description-section">
                  <h3>Product Details</h3>

                  <p>{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==================================================
            ADDITIONAL DETAILS
        ================================================== */}

        <div className="additional-product-content">
          <div className="details-content-card">
            <div className="details-card-heading">
              <h2>Product Details</h2>

              <span>Product information</span>
            </div>

            <div className="details-content-grid">
              <div className="detail-item">
                <span>Product</span>

                <strong>{product.name}</strong>
              </div>

              <div className="detail-item">
                <span>Availability</span>

                <strong>In Stock</strong>
              </div>

              <div className="detail-item">
                <span>Product ID</span>

                <strong>{product.id}</strong>
              </div>

              {product.rating && (
                <div className="detail-item">
                  <span>Rating</span>

                  <strong>
                    {product.rating.toFixed
                      ? product.rating.toFixed(1)
                      : product.rating}{" "}
                    / 5
                  </strong>
                </div>
              )}

              {product.reviews > 0 && (
                <div className="detail-item">
                  <span>Reviews</span>

                  <strong>{product.reviews}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          MOBILE FIXED ACTION
      ================================================== */}

      {showMobileStickyActions && (
        <div className="mobile-sticky-actions" aria-label="Product actions">
          <button
            type="button"
            className={`mobile-sticky-wishlist ${isWishlisted ? "active" : ""}`}
            onClick={toggleWishlist}
            disabled={wishlistButtonDisabled}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {isUpdatingWishlist ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <i
                className={isWishlisted ? "bi bi-heart-fill" : "bi bi-heart"}
              ></i>
            )}
          </button>

          {isInBag ? (
            <button
              type="button"
              className="mobile-sticky-bag-btn view"
              onClick={() => navigate(ROUTE_URL.WEBSITE.CART)}
              disabled={isCartLoading}
            >
              {quantityInBag > 1 ? `Go to Bag (${quantityInBag})` : "Go to Bag"}

              <i className="bi bi-arrow-right"></i>
            </button>
          ) : (
            <button
              type="button"
              className="mobile-sticky-bag-btn"
              onClick={addToBag}
              disabled={cartButtonDisabled}
            >
              {isAddingToBag ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <i className="bi bi-bag-plus"></i>
              )}

              <span>{isAddingToBag ? "Adding..." : "Add to Bag"}</span>
            </button>
          )}
        </div>
      )}

      {/* ==================================================
          IMAGE VIEWER
      ================================================== */}

      {isImageViewerOpen && (
        <div
          className="product-image-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Product image viewer"
          onClick={() => setIsImageViewerOpen(false)}
        >
          <button
            type="button"
            className="viewer-close"
            onClick={() => setIsImageViewerOpen(false)}
            aria-label="Close image viewer"
          >
            <i className="bi bi-x-lg"></i>
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className="viewer-nav viewer-prev"
              onClick={(event) => {
                event.stopPropagation();

                showPreviousImage();
              }}
              aria-label="Previous image"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          )}

          <img
            src={activeImage}
            alt={product.name}
            className="viewer-image"
            onClick={(event) => event.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              type="button"
              className="viewer-nav viewer-next"
              onClick={(event) => {
                event.stopPropagation();

                showNextImage();
              }}
              aria-label="Next image"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          )}

          <div className="viewer-counter">
            {safeSelectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
