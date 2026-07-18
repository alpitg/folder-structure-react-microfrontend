import "./website.scss";
import "../../assets/scss/website.scss";

import FooterApp from "./footer/footer";
import HeaderApp from "./header/header";
import { Outlet } from "react-router";

const WebsiteApp = () => {
  return (
    <div className="website-app">
      <HeaderApp />

      <div className="website-body">
        <Outlet />
      </div>
      <FooterApp></FooterApp>
    </div>
  );
};

export default WebsiteApp;
