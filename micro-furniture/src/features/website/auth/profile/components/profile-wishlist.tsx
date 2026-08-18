import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../../../routes/constants/routes.const";
import { WEBSITE_AUTH_KEY } from "../../../../../constants/global/global-key.const";
import type { WebsiteAuth } from "../profile";
import { useGetWishlistQuery } from "../../../../../app/redux/website/wishlist/website-wishlist.api";

// ============================================================
// HELPERS
// ============================================================

const getStoredWebsiteAuth = (): WebsiteAuth | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const authString = localStorage.getItem(WEBSITE_AUTH_KEY);

  if (!authString) {
    return null;
  }

  try {
    return JSON.parse(authString) as WebsiteAuth;
  } catch (error) {
    console.error("Invalid website authentication data:", error);

    return null;
  }
};

// ============================================================
// COMPONENT
// ============================================================

const ProfileWishlist = () => {
  // ==========================================================
  // AUTH
  // ==========================================================

  const auth = getStoredWebsiteAuth();

  const customerId = auth?.customerId;
  const blankImage = "/static/media/img/svg/blank-image.svg";

  // ==========================================================
  // WISHLIST API
  // ==========================================================

  const {
    data: wishlist,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetWishlistQuery(
    customerId
      ? {
          customerId,
        }
      : undefined,
    {
      skip: !customerId,
    },
  );

  // ==========================================================
  // LOADING
  // ==========================================================

  if (isLoading || isFetching) {
    return (
      <section className="profile-wishlist">
        <div className="profile-wishlist-header">
          <div>
            <h2>My Wishlist</h2>
            <p>Products you have saved.</p>
          </div>
        </div>

        <div className="profile-wishlist-loading">
          <div className="profile-wishlist-spinner">
            <i className="bi bi-arrow-repeat" />
          </div>

          <p>Loading your wishlist...</p>
        </div>
      </section>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (isError) {
    return (
      <section className="profile-wishlist">
        <div className="profile-wishlist-header">
          <div>
            <h2>My Wishlist</h2>
            <p>Products you have saved.</p>
          </div>
        </div>

        <div className="profile-wishlist-error">
          <div className="profile-wishlist-error-icon">
            <i className="bi bi-exclamation-circle" />
          </div>

          <h3>Unable to load wishlist</h3>

          <p>Something went wrong while loading your wishlist.</p>

          <button
            type="button"
            className="profile-wishlist-retry"
            onClick={() => refetch()}
          >
            <i className="bi bi-arrow-clockwise" />

            <span>Try Again</span>
          </button>
        </div>
      </section>
    );
  }

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (!wishlist || !wishlist.items || wishlist.items.length === 0) {
    return (
      <section className="profile-wishlist">
        <div className="profile-wishlist-header">
          <div>
            <h2>My Wishlist</h2>

            <p>Products you have saved.</p>
          </div>
        </div>

        <div className="profile-empty-state">
          <div className="profile-empty-icon">
            <i className="bi bi-heart" />
          </div>

          <h3>Your Wishlist</h3>

          <p>Products you save will appear here.</p>
        </div>
      </section>
    );
  }

  // ==========================================================
  // WISHLIST
  // ==========================================================

  return (
    <section className="profile-wishlist">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="profile-wishlist-header">
        <div>
          <h2>My Wishlist</h2>

          <p>
            {wishlist.items.length}{" "}
            {wishlist.items.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <div className="profile-wishlist-count">
          <i className="bi bi-heart-fill" />

          <span>{wishlist.items.length}</span>
        </div>
      </div>

      {/* ======================================================
          ITEMS
      ====================================================== */}

      <div className="profile-wishlist-grid">
        {wishlist?.items?.map((item) => {
          const product = item.product;

          return (
            <div className="profile-wishlist-card" key={item.id}>
              {/* ============================================
                    IMAGE
                ============================================ */}

              <div className="profile-wishlist-image">
                {product ? (
                  <img
                    src={
                      product?.media?.[0]?.url
                        ? product.media[0].url
                        : blankImage
                    }
                    alt={(product as any)?.name || "Product"}
                  />
                ) : (
                  <div className="profile-wishlist-no-image">
                    <i className="bi bi-image" />
                  </div>
                )}
              </div>

              {/* ============================================
                    DETAILS
                ============================================ */}

              <div className="profile-wishlist-details">
                <h3>{product?.name || product?.code || "Product"}</h3>

                <p className="profile-wishlist-product-id">
                  Product ID: {item.productId}
                </p>

                {/* ==========================================
                      PRICE
                  ========================================== */}

                {product?.price?.sellingPrice && (
                  <div className="profile-wishlist-price">
                    ₹{product?.price?.sellingPrice}
                  </div>
                )}

                {/* ==========================================
                      ACTION
                  ========================================== */}

                <NavLink
                  to={`${ROUTE_URL.WEBSITE.PRODUCT_DETAILS}/${item.productId}`}
                  type="button"
                  className="profile-wishlist-view-btn"
                >
                  <span>View Product</span>
                  <i className="bi bi-arrow-right" />
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileWishlist;
