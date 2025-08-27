import "./landing-page.scss";

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
    <div className="landing-page-app">
      <NavbarApp />
      <div className="landing-page-container">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="app-wrapper mb-5">
          <div
            className={`container-xxl ${
              !isOpen
                ? `landing-page-content`
                : `landing-page-content-collapsed`
            }
            `}
          >
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
