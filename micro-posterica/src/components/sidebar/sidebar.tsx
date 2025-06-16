import "./sidebar.scss";

import type { IRoutes } from "../../interfaces/route.model";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../auth/constants/routes.const";

const Sidebar = (props: { isOpen: boolean; toggleSidebar: () => void }) => {
  const routes: IRoutes[] = [
    {
      label: "Dashboard",
      path: ROUTE_URL.DASHBOARD,
      icon: "pi pi-fw pi-chart-line",
      claims: [],
    },
    {
      label: "Administration",
      path: ROUTE_URL.ADMIN.BASE,
      icon: "pi pi-fw pi-sliders-h",
      claims: [],
      route: [
        {
          label: "Organization Units",
          path: ROUTE_URL.ADMIN.ORGANIZATION_UNITS.BASE,
          icon: "pi pi-fw pi-th-large",
          claims: [],
        },
        {
          label: "Tenant",
          path: ROUTE_URL.ADMIN.TENANT.BASE,
          icon: "pi pi-fw pi-sitemap",
          claims: [],
        },
        {
          label: "Roles",
          path: ROUTE_URL.ADMIN.ROLE.BASE,
          icon: "pi pi-fw pi-briefcase",
          claims: [],
        },
      ],
    },
    {
      label: "Pages",
      path: "",
      icon: "pi pi-fw pi-users",
      claims: [],
      route: [
        {
          label: "About",
          path: ROUTE_URL.ABOUT,
          icon: "pi pi-fw pi-file",
          claims: [],
        },
        {
          label: "Contact",
          path: ROUTE_URL.CONTACT,
          icon: "pi pi-fw pi-comments",
          claims: [],
        },
        {
          label: "Login",
          path: ROUTE_URL.LOGIN,
          claims: [],
          icon: "pi pi-fw pi-sign-in",
        },
        {
          label: "Register",
          path: ROUTE_URL.REGISTER,
          claims: [],
          icon: "pi pi-fw pi-sign-in",
        },
        {
          label: "Social Media",
          path: ROUTE_URL.SOCIAL_MEDIA_MANAGEMENT,
          claims: [],
          icon: "pi pi-fw pi-verified",
        },
        {
          label: "UI",
          path: ROUTE_URL.UI,
          icon: "pi pi-fw pi-bolt",
          claims: [],
        },
      ],
    },
    {
      label: "Gymkhana",
      path: ROUTE_URL.HOME,
      icon: "pi pi-fw pi-chart-line",
      claims: [],
      route: [
        {
          label: "Facility Type",
          path: ROUTE_URL.GYMKHANACLUB.ADMIN.FACILITY_TYPE.BASE,
          icon: "pi pi-fw pi-ticket",
          claims: [],
        },
        {
          label: "Facility Sports",
          path: ROUTE_URL.GYMKHANACLUB.ADMIN.FACILITY.BASE,
          icon: "pi pi-fw pi-tablet",
          claims: [],
        },
        {
          label: "Facility Costing",
          path: ROUTE_URL.GYMKHANACLUB.ADMIN.FACILITY_COSTING.BASE,
          icon: "pi pi-fw pi-tag",
          claims: [],
        },
        {
          label: "Book Slots",
          path: ROUTE_URL.GYMKHANACLUB.FACILITY_BOOK_SLOTS.BASE,
          icon: "pi pi-fw pi-id-card",
          claims: [],
        },
        {
          label: "Signup",
          path: ROUTE_URL.GYMKHANACLUB.SIGNUP,
          icon: "pi pi-fw pi-bolt",
          claims: [],
        },
      ],
    },
    {
      label: "Ticketing tool",
      path: ROUTE_URL.TICKETING_TOOL.BASE,
      icon: "pi pi-fw pi-chart-line",
      claims: [],
      route: [
        {
          label: "Social Login",
          path: ROUTE_URL.TICKETING_TOOL.SOCIAL_LOGINS,
          icon: "pi pi-fw pi-ticket",
          claims: [],
        },
      ],
    },
    {
      label: "Orm tool",
      path: ROUTE_URL.ORM.BASE,
      icon: "pi pi-fw pi-chart-line",
      claims: [],
      route: [
        {
          label: "Home",
          path: ROUTE_URL.ORM.HOME,
          icon: "pi pi-fw pi-ticket",
          claims: [],
        },
        {
          label: "Dashboard",
          path: ROUTE_URL.ORM.DASHBOARD,
          icon: "pi pi-fw pi-ticket",
          claims: [],
        },
        {
          label: "Reports",
          path: ROUTE_URL.ORM.REPORTS.BASE,
          icon: "pi pi-fw pi-ticket",
          claims: [],
        },
        {
          label: "Social Listening",
          path: ROUTE_URL.ORM.SOCIAL_LISTENING.BASE,
          icon: "pi pi-fw pi-ticket",
          claims: [],
        },
        {
          label: "Survey",
          path: ROUTE_URL.ORM.SURVEY.BASE,
          icon: "pi pi-fw pi-ticket",
          claims: [],
        },
        {
          label: "Settings",
          path: ROUTE_URL.ORM.SETTINGS,
          icon: "pi pi-fw pi-ticket",
          claims: [],
        },
      ],
    },
    {
      label: "Settings",
      path: ROUTE_URL.TENANT_SETTINGS,
      icon: "pi pi-fw pi-cog",
      claims: [],
    },
  ];

  const isActivePath = (routes: IRoutes[]) => {
    const path: string[] = location?.pathname?.split("/")?.reverse();
    if (path?.find((x) => x)) {
      return routes.some((x) => x?.path?.includes(path?.find((x) => x) ?? ""));
    } else {
      return false;
    }
  };

  const SideBarNav = ({ route }: { route: IRoutes }) => {
    return (
      <NavLink
        to={route.path}
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        <span className="icon">
          <i className={route.icon}></i>
        </span>
        {route.label}
      </NavLink>
    );
  };

  return (
    <div className="sidebar-app">
      {/* <input id="sidebar-footer-toggle" type="checkbox" />

      <div className="sidebar-content">
        <ul>
          {routes.map((route: IRoutes) => {
            return route.route ? (
              <li key={route.label}>
                <div className="accordion" id={route.label?.replace(" ", "")}>
                  <div className="accordion-item">
                    <button
                      className={
                        isActivePath(route.route)
                          ? "accordion-button active"
                          : "accordion-button collapsed"
                      }
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={
                        "#" + route.label?.replace(" ", "") + "collapse"
                      }
                      aria-expanded="false"
                      aria-controls={route.label?.replace(" ", "") + "collapse"}
                    >
                      <span className="icon">
                        <i className={route.icon}></i>
                      </span>
                      {route.label}
                    </button>
                    <div
                      id={route.label?.replace(" ", "") + "collapse"}
                      className={
                        isActivePath(route.route)
                          ? "accordion-collapse collapse show"
                          : "accordion-collapse collapse"
                      }
                      aria-labelledby={route.label?.replace(" ", "")}
                      data-bs-parent={"#" + route.label?.replace(" ", "")}
                    >
                      {route.route.map((child) => {
                        return <SideBarNav route={child} key={child.label} />;
                      })}
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li key={route.label}>
                <SideBarNav route={route} />
              </li>
            );
          })}
        </ul>

        <div className="sidebar-bottom">
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
      </div> */}

      <input id="sidebar-toggle" type="checkbox" />
      <div id="sidebar-header"></div>
      <div id="sidebar-content">
        {/* <ul>
          {routes.map((route: IRoutes) => {
            return route.route ? (
              <li key={route.label}>
                <div className="accordion" id={route.label?.replace(" ", "")}>
                  <div className="accordion-item">
                    <button
                      className={
                        isActivePath(route.route)
                          ? "accordion-button active"
                          : "accordion-button collapsed"
                      }
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={
                        "#" + route.label?.replace(" ", "") + "collapse"
                      }
                      aria-expanded="false"
                      aria-controls={route.label?.replace(" ", "") + "collapse"}
                    >
                      <span className="icon">
                        <i className={route.icon}></i>
                      </span>
                      {route.label}
                    </button>
                    <div
                      id={route.label?.replace(" ", "") + "collapse"}
                      className={
                        isActivePath(route.route)
                          ? "accordion-collapse collapse show"
                          : "accordion-collapse collapse"
                      }
                      aria-labelledby={route.label?.replace(" ", "")}
                      data-bs-parent={"#" + route.label?.replace(" ", "")}
                    >
                      {route.route.map((child) => {
                        return <SideBarNav route={child} key={child.label} />;
                      })}
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li key={route.label}>
                <SideBarNav route={route} />
              </li>
            );
          })}
        </ul> */}

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
