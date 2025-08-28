import "./navbar.scss";

import SwitchThemeApp from "./switch-theme/switch-theme";
import UserMenuApp from "./user-menu/user-menu";

const NavbarApp = ({ toggleSidebar }: any) => {
  return (
    <div className="navbar-app">
      <nav className={"navbar-content"}>
        <div className="nav-left">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-icon d-lg-none" // visible only on small screens
              onClick={toggleSidebar}
            >
              <i className="bi bi-list fs-1"></i>
            </button>

            <h2 className="m-0">Posterica</h2>
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
