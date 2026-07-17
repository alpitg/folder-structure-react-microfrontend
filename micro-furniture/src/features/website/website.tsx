import "./website.scss";
import "../../assets/scss/website.scss";

import { NavLink, Outlet } from "react-router";

import FooterApp from "./footer/footer";
import HeaderApp from "./header/header";
import { ROUTE_URL } from "../../routes/constants/routes.const";

const WebsiteApp = () => {
  const menus = [
    {
      name: "Home",
      icon: "bi bi-house-door",
      url: ROUTE_URL.WEBSITE.BASE,
    },
    {
      name: "Product",
      icon: "bi bi-box-seam",
      url: ROUTE_URL.WEBSITE.PRODUCTS,
    },
    {
      name: "Cart",
      icon: "bi bi-cart",
      url: ROUTE_URL.WEBSITE.CART,
    },
  ];

  return (
    <div className="website-app">
      <HeaderApp />

      <div className="website-body">
          <ul className="category-menu d-lg-none my-3 mb-0">
            {menus.map((menu) => (
              <li className="category-menu-item" key={menu?.name}>
                <NavLink
                  to={menu?.url}
                  className={({ isActive }) =>
                    `nav-link px-2 text-decoration-none ${
                      isActive ? "fw-bold text-primary" : "fw-normal text-dark"
                    }`
                  }
                >
                  <i className={`${menu?.icon} me-2`}></i>
                  {menu?.name}
                </NavLink>
              </li>
            ))}
          </ul>
        <Outlet />
      </div>
      <FooterApp></FooterApp>
    </div>
  );
};

export default WebsiteApp;
