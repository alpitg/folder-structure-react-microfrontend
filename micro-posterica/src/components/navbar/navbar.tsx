import "./navbar.scss";

const NavbarApp = () => {
  return (
    <div className="navbar-app">
      <nav className={"navbar-content"}>
        <div className="nav-left"> Posterica </div>
        <div className="nav-right">
          hi
          <i className="bi bi-chevron-double-right"></i>
          <i className="bi bi-chevron-double-right"></i>
        </div>
      </nav>
    </div>
  );
};

export default NavbarApp;
