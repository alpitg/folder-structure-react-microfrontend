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
      route: [],
    },
    {
      label: "Administration",
      path: ROUTE_URL.ADMIN.BASE,
      icon: "bi bi-person-fill-gear",
      claims: [],
      route: [],
    },
    // {
    //   label: "Bill Calculation",
    //   path: ROUTE_URL.BILL_CALCULATION,
    //   icon: "bi bi-person-fill-gear",
    //   claims: [],
    //   route: [],
    // },
    // {
    //   label: "Frame Types",
    //   path: ROUTE_URL.MASTER.FRAME_TYPES.BASE,
    //   icon: "bi bi-door-closed",
    //   claims: [],
    //   route: [],
    // },
    // {
    //   label: "Glass Types",
    //   path: ROUTE_URL.MASTER.GLASS_TYPES.BASE,
    //   icon: "bi bi-sunglasses",
    //   claims: [],
    //   route: [],
    // },
    // {
    //   label: "Miscellaneous charges",
    //   path: ROUTE_URL.MASTER.MISC_CHARGES.BASE,
    //   icon: "bi bi-currency-rupee",
    //   claims: [],
    //   route: [],
    // },
    {
      label: "Masters",
      path: ROUTE_URL.CUSTOMERS,
      icon: "bi bi-shield-check",
      claims: [],
      route: [
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
      ],
    },
    // {
    //   label: "Customers",
    //   path: ROUTE_URL.CUSTOMERS,
    //   icon: "bi bi-shield-check",
    //   claims: [],
    // route: [],
    // },
    // {
    //   label: "Bills",
    //   path: ROUTE_URL.BILLS,
    //   icon: "bi bi-shield-check",
    //   claims: [],
    // route: [],
    // },
    // {
    //   label: "UI",
    //   path: ROUTE_URL.UI,
    //   icon: "bi bi-shield-check",
    //   claims: [],
    // route: [],
    // },
    {
      label: "Settings",
      path: ROUTE_URL.APP_SETTINGS,
      icon: "bi bi-shield-check",
      claims: [],
      route: [],
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
      <input id="sidebar-toggle" type="checkbox" />
      <div id="sidebar-content">
        <ul>
          {routes.map((route: IRoutes) => {
            return route?.route && route?.route?.length > 0 ? (
              <li className="side-nav-item" key={route.label}>
                <a
                  data-bs-toggle="collapse"
                  href={`#${route.label?.replace(" ", "")}`}
                  role="button"
                  aria-controls="sidebar"
                >
                  <div className="sidebar-button">
                    <i className={route?.icon}></i>
                    <span>{route?.label}</span>
                    <span className="menu-arrow"></span>
                  </div>
                </a>
                <div className="collapse" id={route.label?.replace(" ", "")}>
                  <ul className="side-nav-second-level">
                    {route?.route.map((subRoute: IRoutes) => {
                      return (
                        <li key={subRoute.label}>
                          <SideBarNav route={subRoute} key={route.label} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={route.label}>{<SideBarNav route={route} />}</li>
            );
          })}
        </ul>
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
