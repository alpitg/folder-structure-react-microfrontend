import { GetEnvConfig } from "../../../app.config";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../routes/constants/routes.const";

const HeaderApp = () => {
  const appSettings = GetEnvConfig();

  return (
    <nav
      className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
      arial-label="Furni navigation bar"
    >
      <div className="container">
        <a className="navbar-brand" href="index.html">
          {appSettings?.name}
          <span>.</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsFurni"
          aria-controls="navbarsFurni"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsFurni">
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link" to={ROUTE_URL.WEBSITE.BASE}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to={ROUTE_URL.WEBSITE.PRODUCTS}>
                Products
              </NavLink>
            </li>
            <li>
              <a className="nav-link" href="#contactus">
                Contact us
              </a>
            </li>
          </ul>

          <ul className="custom-navbar-nav navbar-nav mb-2 mb-md-0 ms-5">
            <li>
              <NavLink className="nav-link" to={ROUTE_URL.WEBSITE.CART}>
                <i className="bi bi-cart3 fs-xl me-1"></i>
                Cart
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderApp;
