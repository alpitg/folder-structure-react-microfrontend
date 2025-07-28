import "./sidebar.scss";

import type { IRoutes } from "../../interfaces/route.model";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../auth/constants/routes.const";
import { useState } from "react";

const Sidebar = (props: { isOpen: boolean; toggleSidebar: () => void }) => {
  const routes: IRoutes[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      path: ROUTE_URL.DASHBOARD,
      icon: "bi bi-pie-chart-fill",
      claims: [],
      subRoutes: [],
    },
    {
      id: "administration",
      title: "Administration",
      path: ROUTE_URL.ADMIN.BASE,
      icon: "bi bi-person-fill-gear",
      claims: [],
      subRoutes: [],
    },
    {
      id: "bill-calculation",
      title: "Bill Calculation",
      path: ROUTE_URL.BILL_CALCULATION,
      icon: "bi bi-person-fill-gear",
      claims: [],
      subRoutes: [],
    },
    {
      id: "masters",
      title: "Masters",
      path: ROUTE_URL.CUSTOMERS,
      icon: "bi bi-shield-check",
      claims: [],
      subRoutes: [
        {
          id: "frame-types",
          title: "Frame Types",
          path: ROUTE_URL.MASTER.FRAME_TYPES.BASE,
          icon: "bi bi-door-closed",
          claims: [],
          subRoutes: [],
        },
        {
          id: "glass-types",
          title: "Glass Types",
          path: ROUTE_URL.MASTER.GLASS_TYPES.BASE,
          icon: "bi bi-sunglasses",
          claims: [],
          subRoutes: [],
        },
        {
          id: "mounting-types",
          title: "Miscellaneous charges",
          path: ROUTE_URL.MASTER.MISC_CHARGES.BASE,
          icon: "bi bi-currency-rupee",
          claims: [],
          subRoutes: [],
        },
      ],
    },
    // {
    //   id: "customers",
    //   title: "Customers",
    //   path: ROUTE_URL.CUSTOMERS,
    //   icon: "bi bi-shield-check",
    //   claims: [],
    // subRoutes: [],
    // },
    // {
    //   id: "bills",
    //   title: "Bills",
    //   path: ROUTE_URL.BILLS,
    //   icon: "bi bi-shield-check",
    //   claims: [],
    // subRoutes: [],
    // },
    // {
    //   id: "ui",
    //   title: "UI",
    //   path: ROUTE_URL.UI,
    //   icon: "bi bi-shield-check",
    //   claims: [],
    // subRoutes: [],
    // },
    {
      id: "settings",
      title: "Settings",
      path: ROUTE_URL.APP_SETTINGS,
      icon: "bi bi-shield-check",
      claims: [],
      subRoutes: [],
    },
  ];

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (menuId: string) => {
    setActiveMenu((prev) => (prev === menuId ? null : menuId));
  };

  return (
    <div
      className="app-sidebar flex-column"
      data-kt-drawer="true"
      data-kt-drawer-name="app-sidebar"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="225px"
      data-kt-drawer-direction="start"
      data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
    >
      <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
        <div id="kt_app_sidebar_menu_wrapper" className="app-sidebar-wrapper">
          <div
            id="kt_app_sidebar_menu_scroll"
            className="hover-scroll-y my-5 mx-3"
            data-kt-scroll="true"
            data-kt-scroll-activate="true"
            data-kt-scroll-height="auto"
            data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
            data-kt-scroll-wrappers="#kt_app_sidebar_menu"
            data-kt-scroll-offset="5px"
            data-kt-scroll-save-state="true"
          >
            <div className="menu menu-column menu-rounded menu-sub-indention fw-semibold">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className={`menu-item menu-accordion ${
                    activeMenu === route.id ? "show" : ""
                  }`}
                  onClick={() => handleMenuClick(route.id)}
                >
                  <>
                    {route?.subRoutes && route?.subRoutes?.length > 0 ? (
                      <span className="menu-link">
                        <span className="menu-icon">
                          <i className={route.icon}></i>
                        </span>
                        <span className="menu-title">{route.title}</span>
                        <span className="menu-arrow"></span>
                      </span>
                    ) : (
                      <span className="menu-link">
                        <span className="menu-icon">
                          <i className={route.icon}></i>
                        </span>
                        <NavLink className="menu-link" to={route.path}>
                          <span className="menu-title">{route.title}</span>
                        </NavLink>
                      </span>
                    )}
                  </>

                  <div
                    className={`menu-sub menu-sub-accordion ${
                      activeMenu === route.id ||
                      route.subRoutes?.some(
                        (subRoute) => subRoute.id === activeMenu
                      )
                        ? "show"
                        : "collapse"
                    }`}
                  >
                    {route?.subRoutes?.map((subRoute, index) => (
                      <div
                        className="menu-item"
                        key={index}
                        onClick={() => handleMenuClick(subRoute.id)} // Pass `true` for subRoutes
                      >
                        <NavLink className="menu-link" to={subRoute.path}>
                          <span className="menu-bullet">
                            <span className="bullet bullet-dot"></span>
                          </span>
                          <span className="menu-title">{subRoute.title}</span>
                        </NavLink>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
        id="kt_app_sidebar_footer"
      >
        <a className="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100">
          <span className="btn-label">Docs &amp; Components</span>
          <i className="ki-duotone ki-document btn-icon fs-2 m-0">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
