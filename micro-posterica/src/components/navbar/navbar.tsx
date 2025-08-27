import "./navbar.scss";

import SwitchThemeApp from "./switch-theme/switch-theme";
import UserMenuApp from "./user-menu/user-menu";

const NavbarApp = () => {
  return (
    <div className="navbar-app">
      <nav className={"navbar-content"}>
        <div className="nav-left">
          <div className="d-flex align-items-center">
            <h2 className="me-5">Posterica</h2>
          </div>
        </div>
        <div className="nav-right">
          <div className="d-flex gap-10">
            <SwitchThemeApp />
            <UserMenuApp />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarApp;
