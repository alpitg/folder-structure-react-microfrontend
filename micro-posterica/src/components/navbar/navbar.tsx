import "./navbar.scss";

import { useEffect, useState } from "react";

const NavbarApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pathParts, setPathParts] = useState<string[]>([]);

  useEffect(() => {
    const currentLocation = window.location.pathname;
    setPathParts(currentLocation.split("/").filter((part) => part !== ""));
  }, []);

  return (
    <div className="navbar-app">
      <nav className={"navbar-content"}>
        <div className="nav-left">
          <div className="d-flex align-items-center">
            <h2 className="me-5">Posterica</h2>
            <div
              className="toast show align-items-center text-bg-primary border-0 ms-5"
              role="alert"
              aria-live="assertive"
              aria-atomic="false"
            >
              <div className="d-flex">
                <div className="toast-body">
                  This application is in development mode..
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-right-breadcrumb me-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {pathParts.map((part, index) => {
                  const isActive = index === pathParts.length - 1;
                  return (
                    <li
                      key={index}
                      className={`breadcrumb-item ${isActive ? "active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <a href={isActive ? "#" : `/${part}`}>{part}</a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
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
      </nav>
    </div>
  );
};

export default NavbarApp;
