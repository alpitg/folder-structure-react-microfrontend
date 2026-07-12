import "./website.scss";
import "../../assets/scss/website.scss";

import { NavLink, Outlet } from "react-router";

import FooterApp from "./footer/footer";
import HeaderApp from "./header/header";
import { ROUTE_URL } from "../../routes/constants/routes.const";

const WebsiteApp = () => {
  return (
    <div className="website-app">
      <HeaderApp />

      <div className="website-body">
        <div className="d-lg-none container my-3">
          <div className="border rounded-3 shadow-sm px-3 py-2 bg-white">
            <ul className="nav justify-content-center align-items-center gap-3">
              <li className="nav-item">
                <NavLink
                  to={ROUTE_URL.WEBSITE.BASE}
                  end
                  className={({ isActive }) =>
                    `nav-link px-2 text-decoration-none ${
                      isActive ? "fw-bold text-primary" : "fw-normal text-dark"
                    }`
                  }
                >
                  <i className="bi bi-house-door me-2"></i>
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={ROUTE_URL.WEBSITE.PRODUCTS}
                  className={({ isActive }) =>
                    `nav-link px-2 text-decoration-none ${
                      isActive ? "fw-bold text-primary" : "fw-normal text-dark"
                    }`
                  }
                >
                  <i className="bi bi-box-seam me-2"></i>
                  Products
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={ROUTE_URL.WEBSITE.CART}
                  className={({ isActive }) =>
                    `nav-link px-2 text-decoration-none d-flex align-items-center ${
                      isActive ? "fw-bold text-primary" : "fw-normal text-dark"
                    }`
                  }
                >
                  <i className="bi bi-cart3 me-2"></i>
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <Outlet />
      </div>
      <FooterApp></FooterApp>
    </div>
  );
};

export default WebsiteApp;
