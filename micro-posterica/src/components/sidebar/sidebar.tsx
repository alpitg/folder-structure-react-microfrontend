import "./sidebar.scss";

import type { IRoutes } from "../../interfaces/route.model";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../auth/constants/routes.const";

const Sidebar = (props: { isOpen: boolean; toggleSidebar: () => void }) => {
  const routes: IRoutes[] = [
    {
      label: "Dashboard",
      path: ROUTE_URL.DASHBOARD,
      icon: "bi bi-pie-chart-fill",
      claims: [],
    },
    {
      label: "Administration",
      path: ROUTE_URL.ADMIN.BASE,
      icon: "bi bi-person-fill-gear",
      claims: [],
      route: [],
    },
    {
      label: "Bill Calculation",
      path: ROUTE_URL.BILL_CALCULATION,
      icon: "bi bi-person-fill-gear",
      claims: [],
      route: [],
    },
    {
      label: "Frame Types",
      path: ROUTE_URL.MASTER.FRAME_TYPES.BASE,
      icon: "bi bi-door-closed",
      claims: [],
      route: [],
    },
    {
      label: "Glass Types",
      path: ROUTE_URL.MASTER.GLASS_TYPES.BASE,
      icon: "bi bi-sunglasses",
      claims: [],
      route: [],
    },
    {
      label: "Miscellaneous charges",
      path: ROUTE_URL.MASTER.MISC_CHARGES.BASE,
      icon: "bi bi-currency-rupee",
      claims: [],
      route: [],
    },
    {
      label: "Products",
      path: ROUTE_URL.CUSTOMERS,
      icon: "bi bi-shield-check",
      claims: [],
      route: [
        {
          label: "Products",
          path: ROUTE_URL.CUSTOMERS,
          icon: "bi bi-shield-check",
          claims: [],
        },
        {
          label: "Frame Types",
          path: ROUTE_URL.CUSTOMERS,
          icon: "bi bi-shield-check",
          claims: [],
        },
        {
          label: "Glass Types",
          path: ROUTE_URL.CUSTOMERS,
          icon: "bi bi-shield-check",
          claims: [],
        },
        {
          label: "Mount Types",
          path: ROUTE_URL.CUSTOMERS,
          icon: "bi bi-shield-check",
          claims: [],
        },
      ],
    },
    {
      label: "Customers",
      path: ROUTE_URL.CUSTOMERS,
      icon: "bi bi-shield-check",
      claims: [],
    },
    {
      label: "Bills",
      path: ROUTE_URL.BILLS,
      icon: "bi bi-shield-check",
      claims: [],
    },
    {
      label: "UI",
      path: ROUTE_URL.UI,
      icon: "bi bi-shield-check",
      claims: [],
    },
    {
      label: "Settings",
      path: ROUTE_URL.APP_SETTINGS,
      icon: "bi bi-shield-check",
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
        <div className="sidebar-button">
          <i className={route?.icon}></i>
          <span>{route?.label}</span>
        </div>
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

        {routes.map((route: IRoutes) => {
          return <SideBarNav route={route} key={route.label} />;
        })}
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
