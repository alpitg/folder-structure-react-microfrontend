import "./website.scss";
import "../../assets/scss/website.scss";

import { NavLink, Outlet } from "react-router";

import Footer from "./footer/footer";
import { GetEnvConfig } from "../../app.config";

const WebsiteApp = () => {
  const appSettings = GetEnvConfig();

  return (
    <div className="website-app">
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
              <li className="nav-item active">
                <a className="nav-link" href="#home">
                  Home
                </a>
              </li>

              <li>
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li>
                <a className="nav-link" href="#recentWorks">
                  Blog
                </a>
              </li>
              <li>
                <a className="nav-link" href="#contactus">
                  Contact us
                </a>
              </li>
            </ul>

            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
              <li>
                <a className="nav-link" href="#">
                  <img src="/static/media/img/user.svg" />
                </a>
              </li>
              <li>
                <a className="nav-link" href="cart.html">
                  <img src="/static/media/img/cart.svg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="website-body" id="home">
        <Outlet />
        <Footer></Footer>
      </div>
    </div>
  );
};

export default WebsiteApp;
