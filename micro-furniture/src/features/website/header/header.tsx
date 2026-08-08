import "./header.scss";

import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../routes/constants/routes.const";

const HeaderApp = () => {
  const closeNavbar = () => {
    if (window.innerWidth >= 768) return;

    const navbar = document.getElementById("navbarsFurni");

    if (!navbar) return;

    // @ts-ignore
    const collapse = window.bootstrap?.Collapse.getOrCreateInstance(navbar);

    collapse?.hide();
  };

  return (
    <nav className="navbar navbar-expand-md header-navbar sticky-top">
      <div className="container-fluid px-3 px-lg-5">
        {/* Logo */}
        <NavLink
          className="navbar-brand header-logo"
          to={ROUTE_URL.WEBSITE.BASE}
          onClick={closeNavbar}
        >
          {/* <span className="logo-mark">A</span> */}
          <img
            src="/static/logo/1-transparent-logo.png"
            className="img-fluid"
            alt="Image"
            width={200}
            height={200}
          />
        </NavLink>

        {/* Mobile Cart + Toggle */}
        <div className="d-flex align-items-center gap-5 d-md-none">
          <NavLink
            to={ROUTE_URL.WEBSITE.CART}
            className="mobile-cart"
            title="Cart"
          >
            <i className="bi bi-bag fs-5"></i>
          </NavLink>

          <button
            className="navbar-toggler border-0 shadow-none p-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsFurni"
            aria-controls="navbarsFurni"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarsFurni">
          {/* Navigation */}
          <ul className="navbar-nav header-nav mb-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={ROUTE_URL.WEBSITE.BASE}
                onClick={closeNavbar}
              >
                HOME
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={ROUTE_URL.WEBSITE.PRODUCTS}
                onClick={closeNavbar}
              >
                PRODUCTS
              </NavLink>
            </li>
          </ul>

          {/* Search */}
          <div className="header-search mx-md-4 my-3 my-md-0">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search for products, brands and more"
              aria-label="Search"
            />
          </div>

          {/* Right Actions */}
          <ul className="navbar-nav header-actions ms-auto">
            <li className="nav-item">
              <NavLink
                to={ROUTE_URL.WEBSITE.CART}
                className="action-link"
                onClick={closeNavbar}
              >
                <i className="bi bi-person"></i>
                <span>Profile</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={ROUTE_URL.WEBSITE.WISHLIST}
                className="action-link"
                onClick={closeNavbar}
              >
                <i className="bi bi-heart"></i>
                <span>Wishlist</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={ROUTE_URL.WEBSITE.CART}
                className="action-link cart-action"
                onClick={closeNavbar}
              >
                <i className="bi bi-bag"></i>
                <span>Bag</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderApp;
