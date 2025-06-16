import "./landing-page.scss";

import NavbarApp from "../navbar/navbar";
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
        <div
          className={
            !isOpen ? `landing-page-content` : `landing-page-content-collapsed`
          }
        >
          <h1>Welcome to the Landing Page</h1>
          <p>This is a simple landing page component.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPageApp;
