import "./empty-cart.scss";

import { NavLink } from "react-router";

const EmptyCartApp = () => {
  return (
    <div className="empty-cart-app text-center py-5 d-flex flex-column align-items-center justify-content-center">
      <i className="bi bi-cart3 empty-cart-icon mb-3"></i>

      <h4 className="mb-4 fw-normal">Your cart is currently empty.</h4>

      <NavLink
        to="/products"
        className="btn btn-dark px-4 py-2 d-inline-flex align-items-center gap-2"
      >
        <i className="bi bi-arrow-left"></i>
        Continue Shopping
      </NavLink>
    </div>
  );
};

export default EmptyCartApp;
