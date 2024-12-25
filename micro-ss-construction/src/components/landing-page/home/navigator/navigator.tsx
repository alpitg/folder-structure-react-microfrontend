import "./navigator.scss";

import { useState } from "react";

const Navigator = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navigator">
      <div className={`navigator__container`}>
        <div className="navigator__container__logo">
          <img src="/images/logo1.png" alt="Logo" />
        </div>
        <div className="navigator__container__toggle" onClick={toggleMenu}>
          &#9776; {/* Hamburger menu icon */}
        </div>
        <div className={`navigator__container__menu ${!menuOpen ? "hide-menu" : ""}`}>
          <ul>
            <li>
              <a href="#top-section">Home</a>
            </li>
            <li>
              <a href="#our-projects">Projects</a>
            </li>
            <li>
              <a href="#why-choose-us">Why Choose Us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigator;
