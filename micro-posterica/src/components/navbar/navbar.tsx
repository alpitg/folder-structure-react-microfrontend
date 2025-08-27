import "./navbar.scss";

import UserMenuApp from "./user-menu";
import { useState } from "react";

const NavbarApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="navbar-app">
      <nav className={"navbar-content"}>
        <div className="nav-left">
          <div className="d-flex align-items-center">
            <h2 className="me-5">Posterica</h2>
          </div>
        </div>
        <div className="nav-right gap-10">
          <div className="d-flex theme-switch">
            <i className="bi bi-sun-fill ms-2" title="Light theme"></i>
            <div className="ms-2 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="switchCheckChecked"
                checked={isDarkMode}
                onChange={() => {
                  setIsDarkMode(!isDarkMode);
                  localStorage.setItem("isDarkMode", (!isDarkMode).toString());
                  document.body.setAttribute(
                    "data-bs-theme",
                    !isDarkMode ? "dark" : "light"
                  );
                  document.body.setAttribute(
                    "data-kt-app-layout",
                    !isDarkMode ? "light-sidebar" : "light-sidebar"
                  );
                }}
              />
              <label
                className="form-check-label"
                htmlFor="switchCheckChecked"
              ></label>
              <i className="bi bi-moon-fill" title="Dark theme"></i>
            </div>
          </div>

          <UserMenuApp />
        </div>
      </nav>
    </div>
  );
};

export default NavbarApp;
