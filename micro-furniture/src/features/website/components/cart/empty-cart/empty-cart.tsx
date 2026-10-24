import "./empty-cart.scss";

import { NavLink } from "react-router";

const EmptyCartApp = () => {
  return (
    <div className="empty-cart-app">
      <div className="empty-cart-content">
        <div className="empty-cart-illustration">
          <div className="empty-cart-bag">
            <div className="empty-cart-bag-handle"></div>

            <div className="empty-cart-bag-body">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <h2 className="empty-cart-title">Your cart is currently empty</h2>

        <h4 className="empty-cart-message fw-normal">
          Looks like you haven't added anything yet. Explore our collection and
          find something you love.
        </h4>

        <NavLink
          to="/products"
          className="btn btn-dark px-4 py-2 d-inline-flex align-items-center justify-content-center gap-2 continue-shopping-btn"
        >
          <i className="bi bi-arrow-left"></i>
          Continue Shopping
        </NavLink>
      </div>
    </div>
  );
};

export default EmptyCartApp;
