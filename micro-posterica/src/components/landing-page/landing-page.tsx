import "./landing-page.scss";

import AppInitializer from "../app-initializer/app-initializer";
import NavbarApp from "../navbar/navbar";
import { Outlet } from "react-router";
import Sidebar from "../sidebar/sidebar";
import ToastApp from "../ui/toast/toast";
import { clearToast } from "../../app/redux/core/app-settings/app-settings.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useToast } from "../../hooks/use-toast";

const LandingPageApp = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="landing-page-app">
      <div className="landing-page-container">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <NavbarApp isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Overlay for mobile */}
        {isOpen && (
          <div className="sidebar-overlay" onClick={toggleSidebar}></div>
        )}

        <div
          className={`main-body-container ${
            !isOpen ? "landing-page-content" : "landing-page-content-collapsed"
          }`}
        >
          <div className="container-xxl">
            <Outlet />
          </div>
        </div>
      </div>

      <ToastApp
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => dispatch(clearToast())}
      />
    </div>
  );
};

export default LandingPageApp;
