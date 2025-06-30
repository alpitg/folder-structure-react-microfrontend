import "./landing-page.scss";

import NavbarApp from "../navbar/navbar";
import { Outlet } from "react-router";
import Sidebar from "../sidebar/sidebar";
import { useState } from "react";

const LandingPageApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="landing-page-app">
      <NavbarApp />
      <div className="landing-page-container">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="base-container">
          <div
            className={
              !isOpen
                ? `landing-page-content`
                : `landing-page-content-collapsed`
            }
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageApp;
