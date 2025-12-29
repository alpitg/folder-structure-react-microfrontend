import { useEffect, useState } from "react";

import { LOCALSTORAGE_IS_DARK_MODE_KEY } from "../../../constants/global/global-key.const";

const SwitchThemeApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme =
      localStorage.getItem(LOCALSTORAGE_IS_DARK_MODE_KEY) === "true";
    setIsDarkMode(savedTheme);
    document.body.setAttribute("data-bs-theme", savedTheme ? "dark" : "light");
    document.body.setAttribute("data-kt-app-layout", "light-sidebar");
  }, []);

  return (
    <div className="theme-switch-app d-flex align-items-center">
      <i className="bi bi-sun-fill fs-3 me-2" title="Light theme"></i>
      <div className="form-check form-switch d-flex align-items-center justify-content-center">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="switchCheckChecked"
          checked={isDarkMode}
          onChange={() => {
            const newTheme = !isDarkMode;
            setIsDarkMode(newTheme);
            localStorage.setItem(
              LOCALSTORAGE_IS_DARK_MODE_KEY,
              newTheme.toString()
            );
            document.body.setAttribute(
              "data-bs-theme",
              newTheme ? "dark" : "light"
            );
            document.body.setAttribute("data-kt-app-layout", "light-sidebar");
          }}
        />
      </div>
      <i className="bi bi-moon-fill fs-4 ms-2" title="Dark theme"></i>
    </div>
  );
};

export default SwitchThemeApp;
