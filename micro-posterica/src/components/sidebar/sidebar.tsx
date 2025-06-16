import "./sidebar.scss";

const Sidebar = (props: { isOpen: boolean; toggleSidebar: () => void }) => {
  return (
    <div id="sidebar-app">
      <input id="sidebar-toggle" type="checkbox" />
      <div id="sidebar-header"></div>
      <div id="sidebar-content">
        <div className="sidebar-button">
          <i className="bi bi-app"></i>

          <span>Your Work</span>
        </div>
        <div className="sidebar-button">
          <i className="bi bi-app"></i>
          <span>Assets</span>
        </div>
        <div className="sidebar-button">
          <i className="bi bi-app"></i>
          <span>Pinned Items</span>
        </div>
        <hr />
        <div className="sidebar-button">
          <i className="bi bi-app"></i>
          <span>Following</span>
        </div>
        <div className="sidebar-button">
          <i className="bi bi-app"></i>
          <span>Trending</span>
        </div>
        <div className="sidebar-button">
          <i className="bi bi-app"></i>
          <span>Challenges</span>
        </div>
        <div className="sidebar-button">
          <i className="bi bi-app"></i>
          <span>Spark</span>
        </div>
        <hr />
        <div className="sidebar-button">
          <i className="bi bi-app"></i>
          <span>Codepen Pro</span>
        </div>
        <div id="sidebar-content-highlight"></div>
      </div>
      <input id="sidebar-footer-toggle" type="checkbox" />

      <label
        id="sidebar-footer"
        htmlFor="sidebar-toggle"
        onClick={() => props?.toggleSidebar()}
      >
        {!props?.isOpen ? (
          <span className="d-flex">
            <i className="bi bi-chevron-double-left"></i>
            Collapsed View
          </span>
        ) : (
          <i className="bi bi-chevron-double-right"></i>
        )}
      </label>
    </div>
  );
};

export default Sidebar;
