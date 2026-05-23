import "./landing-page.scss";

import MealFooterApp from "../../features/dashboard/meal-footer/meal-footer";
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="landing-page-app">
        <div className="landing-page-container">
          {/* <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} /> */}
          <NavbarApp
            isOpen={isOpen}
            enableToggle={false}
            toggleSidebar={toggleSidebar}
          />

          {/* Overlay for mobile */}
          {isOpen && (
            <div className="sidebar-overlay" onClick={toggleSidebar}></div>
          )}

          <div
            className={`main-body-container ${
              !isOpen
                ? "landing-page-content"
                : "landing-page-content-collapsed"
            }`}
          >
            <div className="container-xxl p-0">
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
      <MealFooterApp />
    </>
  );
};

export default LandingPageApp;
