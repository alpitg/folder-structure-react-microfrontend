import "./sidebar.scss";

import { useEffect, useState } from "react";

import type { IRoutes } from "../../interfaces/route.model";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../auth/constants/routes.const";

const Sidebar = (props: { isOpen: boolean; toggleSidebar: () => void }) => {
  const catalog: IRoutes = {
    id: "catalog",
    title: "Catalog",
    path: ROUTE_URL.CATALOG.BASE,
    icon: "bi bi-box",
    claims: [],
    subRoutes: [
      {
        id: "product-list",
        title: "Product Listing",
        path: ROUTE_URL.CATALOG.PRODUCT.LIST,
        icon: "bi bi-person-fill-gea",
        claims: [],
        subRoutes: [],
      },
      {
        id: "product-add",
        title: "Add Product",
        path: ROUTE_URL.CATALOG.PRODUCT.ADD,
        icon: "bi bi-person-fill-gear",
        claims: [],
        subRoutes: [],
      },
      {
        id: "product-category-list",
        title: "Category Listing",
        path: ROUTE_URL.CATALOG.CATEGORY.LIST,
        icon: "bi bi-person-fill-gea",
        claims: [],
        subRoutes: [],
      },
      {
        id: "product-category-add",
        title: "Add Category",
        path: ROUTE_URL.CATALOG.CATEGORY.ADD,
        icon: "bi bi-person-fill-gear",
        claims: [],
        subRoutes: [],
      },
    ],
  };

  const sales: IRoutes = {
    id: "sales",
    title: "Sales",
    path: ROUTE_URL.SALES.BASE,
    icon: "bi bi-journal-bookmark",
    claims: [],
    subRoutes: [
      {
        id: "order-list",
        title: "Order Listing",
        path: ROUTE_URL.SALES.ORDER.BASE,
        icon: "bi bi-person-fill-gea",
        claims: [],
        subRoutes: [],
      },
      {
        id: "order-add",
        title: "Add Order",
        path: ROUTE_URL.SALES.ORDER.ADD,
        icon: "bi bi-person-fill-gear",
        claims: [],
        subRoutes: [],
      },
    ],
  };

  const master: IRoutes = {
    id: "masters",
    title: "Masters",
    path: ROUTE_URL.MASTER.BASE,
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
  };

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
    catalog,
    sales,
    master,
    // {
    //   id: "invoice-manager",
    //   title: "Invoice Manager",
    //   path: ROUTE_URL.INVOICE_MANAGER.BASE,
    //   icon: "bi bi-person-fill-gear",
    //   claims: [],
    //   subRoutes: [
    //     {
    //       id: "create-invoice",
    //       title: "Create Invoice",
    //       path: ROUTE_URL.INVOICE_MANAGER.CREATE,
    //       icon: "bi bi-person-fill-gear",
    //       claims: [],
    //       subRoutes: [],
    //     },
    //     {
    //       id: "view-invoice",
    //       title: "View Invoice",
    //       path: ROUTE_URL.INVOICE_MANAGER.VIEW,
    //       icon: "bi bi-person-fill-gear",
    //       claims: [],
    //       subRoutes: [],
    //     },
    //   ],
    // },
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

   // ✅ open parent menu if current route matches subRoute
   useEffect(() => {
    routes.forEach((route) => {
      if (route.subRoutes?.some((sub) => location.pathname.startsWith(sub.path))) {
        setActiveMenu(route.id);
      }
      if (location.pathname.startsWith(route.path) && !route.subRoutes?.length) {
        setActiveMenu(route.id);
      }
    });
  }, [location.pathname]);
  
  return (
    <div className="app-sidebar flex-column">
      <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
        <div id="kt_app_sidebar_menu_wrapper" className="app-sidebar-wrapper">
          <div
            id="kt_app_sidebar_menu_scroll"
            className="hover-scroll-y my-5 mx-3"
          >
            <div className="menu menu-column menu-rounded menu-sub-indention fw-semibold">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className={`menu-item menu-accordion ${
                    activeMenu === route?.id ? "show" : ""
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
                      <NavLink className="menu-link" to={route.path}>
                        <span className="menu-icon">
                          <i className={route.icon}></i>
                        </span>
                        <span className="menu-title">{route.title}</span>
                      </NavLink>
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
                    {route?.subRoutes?.map((subRoute) => (
                      <div
                        className={"menu-item " + subRoute?.id}
                        key={subRoute?.id}
                        onClick={() => {
                          handleMenuClick(subRoute?.id);
                        }}
                      >
                        <NavLink className="menu-link" to={subRoute?.path}>
                          <span className="menu-bullet">
                            <span className="bullet bullet-dot"></span>
                          </span>
                          <span className="menu-title">{subRoute?.title}</span>
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

      {/* <div
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
      </div> */}
    </div>
  );
};

export default Sidebar;
