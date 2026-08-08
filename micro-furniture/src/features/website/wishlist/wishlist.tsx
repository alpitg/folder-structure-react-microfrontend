import "./wishlist.scss";

import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../routes/constants/routes.const";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  originalPrice?: number;
  discount?: number;
  inStock?: boolean;
}

const WishlistApp = () => {
  /*
   * Replace this with Redux wishlist data later.
   *
   * Example:
   *
   * const items = useSelector(
   *   (state: AppState) => state.core.wishlist.items
   * );
   */

  const items: WishlistItem[] = [];

  const removeFromWishlist = (id: string) => {
    console.log("Remove wishlist item:", id);
  };

  const moveToBag = (item: WishlistItem) => {
    console.log("Move to bag:", item);
  };

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
            {items.map((item) => (
              <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                <div className="wishlist-card">
                  {/* Product Image */}

                  <div className="wishlist-image-wrapper">
                    <NavLink
                      to={`/products/${item.id}`}
                      className="text-decoration-none"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="wishlist-image"
                      />
                    </NavLink>

                    {/* Remove */}

                    <button
                      type="button"
                      className="wishlist-remove"
                      onClick={() => removeFromWishlist(item.id)}
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>

                  {/* Product Details */}

                  <div className="wishlist-details">
                    <NavLink
                      to={`/products/${item.id}`}
                      className="wishlist-product-name"
                    >
                      {item.name}
                    </NavLink>

                    {/* Price */}

                    <div className="wishlist-price">
                      <span className="selling-price">
                        ₹ {item.price.toFixed(2)}
                      </span>

                      {item.originalPrice &&
                        item.originalPrice > item.price && (
                          <span className="original-price">
                            ₹ {item.originalPrice.toFixed(2)}
                          </span>
                        )}

                      {item.discount && item.discount > 0 && (
                        <span className="discount">{item.discount}% OFF</span>
                      )}
                    </div>

                    {/* Stock */}

                    {item.inStock === false && (
                      <div className="out-of-stock">Out of stock</div>
                    )}

                    {/* Move To Bag */}

                    <button
                      type="button"
                      className="move-to-bag-btn"
                      disabled={item.inStock === false}
                      onClick={() => moveToBag(item)}
                    >
                      <i className="bi bi-bag"></i>
                      Move to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistApp;
