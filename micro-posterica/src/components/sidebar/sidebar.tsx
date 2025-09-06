import "./sidebar.scss";

import { useEffect, useState } from "react";

import type { IRoutes } from "../../interfaces/route.model";
import { NavLink } from "react-router";
import { PERMISSION } from "../../routes/constants/permission.const";
import { ROUTE_URL } from "../../routes/constants/routes.const";
import { hasPermission } from "../../utils/permission.util";
import { useAuth } from "../../hooks/use-auth";

const Sidebar = (props: { isOpen: boolean; toggleSidebar: () => void }) => {
  const { user } = useAuth();
  const userClaims = user?.grantedRoles || [];

  //#region sidebar menu constant
  const administration: IRoutes = {
    id: "administration",
    title: "Administration",
    path: ROUTE_URL.ADMINISTRATION.BASE,
    icon: "bi bi bi-sliders fs-3",
    claims: [
      PERMISSION.PAGES.ADMINISTRATION.ORGANIZATION_UNITS.DEFAULT,
      PERMISSION.PAGES.ADMINISTRATION.ROLES.DEFAULT,
      PERMISSION.PAGES.ADMINISTRATION.USERS.DEFAULT,
    ],
    subRoutes: [
      {
        id: "organization-units",
        title: "Organization Units",
        path: ROUTE_URL.ADMINISTRATION.ORGANIZATION_UNIT.BASE,
        icon: "bi bi-diagram-3 fs-3",
        claims: [
          PERMISSION.PAGES.ADMINISTRATION.ORGANIZATION_UNITS.DEFAULT,
          PERMISSION.PAGES.ADMINISTRATION.ORGANIZATION_UNITS.DETAIL,
        ],
        subRoutes: [],
      },
      {
        id: "roles",
        title: "Roles",
        path: ROUTE_URL.ADMINISTRATION.ROLES.BASE,
        icon: "bi bi-suitcase-lg fs-3",
        claims: [
          PERMISSION.PAGES.ADMINISTRATION.ROLES.DEFAULT,
          PERMISSION.PAGES.ADMINISTRATION.ROLES.DETAIL,
        ],
        subRoutes: [],
      },
      {
        id: "users",
        title: "Users",
        path: ROUTE_URL.ADMINISTRATION.USERS.BASE,
        icon: "bi bi-people fs-3",
        claims: [
          PERMISSION.PAGES.ADMINISTRATION.USERS.DEFAULT,
          PERMISSION.PAGES.ADMINISTRATION.USERS.DETAIL,
        ],
        subRoutes: [],
      },
    ],
  };

  const catalog: IRoutes = {
    id: "catalog",
    title: "Catalog",
    path: ROUTE_URL.CATALOG.BASE,
    icon: "bi bi-box fs-3",
    claims: [
      PERMISSION.PAGES.CATALOG.PRODUCT.DEFAULT,
      PERMISSION.PAGES.CATALOG.CATEGORY.DEFAULT,
    ],
    subRoutes: [
      {
        id: "product-list",
        title: "Product Listing",
        path: ROUTE_URL.CATALOG.PRODUCT.LIST,
        icon: "bi bi-card-list fs-3",
        claims: [
          PERMISSION.PAGES.CATALOG.PRODUCT.DEFAULT,
          PERMISSION.PAGES.CATALOG.PRODUCT.DETAIL,
        ],
        subRoutes: [],
      },
      {
        id: "product-add",
        title: "Add Product",
        path: ROUTE_URL.CATALOG.PRODUCT.ADD,
        icon: "bi bi-plus-lg fs-3",
        claims: [
          PERMISSION.PAGES.CATALOG.PRODUCT.CREATE,
          PERMISSION.PAGES.CATALOG.PRODUCT.EDIT,
        ],
        subRoutes: [],
      },
      {
        id: "product-category-list",
        title: "Category Listing",
        path: ROUTE_URL.CATALOG.CATEGORY.LIST,
        icon: "bi bi-list-nested fs-3",
        claims: [
          PERMISSION.PAGES.CATALOG.CATEGORY.DEFAULT,
          PERMISSION.PAGES.CATALOG.CATEGORY.DETAIL,
        ],
        subRoutes: [],
      },
      {
        id: "product-category-add",
        title: "Add Category",
        path: ROUTE_URL.CATALOG.CATEGORY.ADD,
        icon: "bi bi-plus-lg fs-3",
        claims: [
          PERMISSION.PAGES.CATALOG.CATEGORY.CREATE,
          PERMISSION.PAGES.CATALOG.CATEGORY.EDIT,
        ],
        subRoutes: [],
      },
    ],
  };

  const sales: IRoutes = {
    id: "sales",
    title: "Sales",
    path: ROUTE_URL.SALES.BASE,
    icon: "bi bi-journal-bookmark fs-3",
    claims: [PERMISSION.PAGES.SALES.ORDER.DEFAULT],
    subRoutes: [
      {
        id: "order-list",
        title: "Order Listing",
        path: ROUTE_URL.SALES.ORDER.LIST,
        icon: "bi bi-card-checklist fs-3",
        claims: [
          PERMISSION.PAGES.SALES.ORDER.DEFAULT,
          PERMISSION.PAGES.SALES.ORDER.DETAIL,
        ],
        subRoutes: [],
      },
      {
        id: "order-add",
        title: "Add Order",
        path: ROUTE_URL.SALES.ORDER.ADD,
        icon: "bi bi-plus-lg fs-3",
        claims: [
          PERMISSION.PAGES.SALES.ORDER.CREATE,
          PERMISSION.PAGES.SALES.ORDER.EDIT,
        ],
        subRoutes: [],
      },
    ],
  };

  const customer: IRoutes = {
    id: "customer",
    title: "Customers",
    path: ROUTE_URL.CUSTOMER.BASE,
    icon: "bi bi-person-workspace fs-3",
    claims: [PERMISSION.PAGES.SALES.CUSTOMERS.DEFAULT],
    subRoutes: [
      {
        id: "customer-list",
        title: "Customer Listing",
        path: ROUTE_URL.CUSTOMER.LIST,
        icon: "bi bi-card-list fs-3",
        claims: [
          PERMISSION.PAGES.SALES.ORDER.DEFAULT,
          PERMISSION.PAGES.SALES.ORDER.DETAIL,
        ],
        subRoutes: [],
      },
      {
        id: "customer-add",
        title: "Add Customer",
        path: ROUTE_URL.CUSTOMER.ADD,
        icon: "bi bi-plus-lg fs-3",
        claims: [
          PERMISSION.PAGES.SALES.ORDER.CREATE,
          PERMISSION.PAGES.SALES.ORDER.EDIT,
        ],
        subRoutes: [],
      },
    ],
  };

  const master: IRoutes = {
    id: "masters",
    title: "Masters",
    path: ROUTE_URL.MASTER.BASE,
    icon: "bi bi-database-check fs-3",
    claims: [
      PERMISSION.PAGES.MASTER.FRAME_TYPES.DEFAULT,
      PERMISSION.PAGES.MASTER.GLASS_TYPES.DEFAULT,
      PERMISSION.PAGES.MASTER.MISC_CHARGES.DEFAULT,
    ],
    subRoutes: [
      {
        id: "frame-types",
        title: "Frame Types",
        path: ROUTE_URL.MASTER.FRAME_TYPES.BASE,
        icon: "bi bi-door-closed fs-3",
        claims: [
          PERMISSION.PAGES.MASTER.FRAME_TYPES.DEFAULT,
          PERMISSION.PAGES.MASTER.FRAME_TYPES.CREATE,
          PERMISSION.PAGES.MASTER.FRAME_TYPES.EDIT,
          PERMISSION.PAGES.MASTER.FRAME_TYPES.DELETE,
        ],
        subRoutes: [],
      },
      {
        id: "glass-types",
        title: "Glass Types",
        path: ROUTE_URL.MASTER.GLASS_TYPES.BASE,
        icon: "bi bi-sunglasses fs-3",
        claims: [
          PERMISSION.PAGES.MASTER.GLASS_TYPES.DEFAULT,
          PERMISSION.PAGES.MASTER.GLASS_TYPES.CREATE,
          PERMISSION.PAGES.MASTER.GLASS_TYPES.EDIT,
          PERMISSION.PAGES.MASTER.GLASS_TYPES.DELETE,
        ],
        subRoutes: [],
      },
      {
        id: "mounting-types",
        title: "Miscellaneous Charges",
        path: ROUTE_URL.MASTER.MISC_CHARGES.BASE,
        icon: "bi bi-currency-rupee fs-3",
        claims: [
          PERMISSION.PAGES.MASTER.MISC_CHARGES.DEFAULT,
          PERMISSION.PAGES.MASTER.MISC_CHARGES.CREATE,
          PERMISSION.PAGES.MASTER.MISC_CHARGES.EDIT,
          PERMISSION.PAGES.MASTER.MISC_CHARGES.DELETE,
        ],
        subRoutes: [],
      },
    ],
  };

  const routes: IRoutes[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      path: ROUTE_URL.DASHBOARD,
      icon: "bi bi-grid fs-3",
      claims: [PERMISSION.PAGES.DASHBOARD.DEFAULT],
      subRoutes: [],
    },
    administration,
    catalog,
    sales,
    customer,
    master,
    {
      id: "ui",
      title: "UI Component",
      path: ROUTE_URL.UI,
      icon: "bi bi-easel fs-3",
      claims: [PERMISSION.PAGES.UIComponent.DEFAULT],
      subRoutes: [],
    },
    {
      id: "settings",
      title: "Settings",
      path: ROUTE_URL.APP_SETTINGS,
      icon: "bi bi-shield-check fs-3",
      claims: [PERMISSION.PAGES.SETTINGS.DEFAULT],
      subRoutes: [],
    },
  ];
  //#endregion

  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const filteredRoutes = routes
    .filter((route) => hasPermission(userClaims, route?.claims))
    .map((route) => ({
      ...route,
      subRoutes: route?.subRoutes?.filter((sub) =>
        hasPermission(userClaims, sub?.claims)
      ),
    }));

  // ✅ only add, never remove (so second click keeps open)
  const handleMenuClick = (menuId: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuId) ? prev : [...prev, menuId]
    );
  };

  // ✅ auto open matching parent on refresh or path change
  useEffect(() => {
    routes.forEach((route) => {
      if (
        route.subRoutes?.some((sub) => location.pathname.startsWith(sub.path))
      ) {
        setOpenMenus((prev) =>
          prev.includes(route.id) ? prev : [...prev, route.id]
        );
      }
      if (
        location.pathname.startsWith(route.path) &&
        !route.subRoutes?.length
      ) {
        setOpenMenus((prev) =>
          prev.includes(route.id) ? prev : [...prev, route.id]
        );
      }
    });
  }, [location.pathname]);

  return (
    <div
      className={`app-sidebar flex-column ${
        props?.isOpen ? "sidebar-open shadow" : "sidebar-closed"
      }`}
    >
      <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
        <div className="app-sidebar-wrapper">
          <div className="hover-scroll-y my-5 mx-3">
            <div className="sidebar-header mb-5">
              <div className="d-flex align-items-center justify-content-between p-5">
                <h2 className="m-0">Posterica</h2>
              </div>
            </div>
            <div className="menu menu-column menu-rounded menu-sub-indention fw-semibold">
              {filteredRoutes?.map((route) => (
                <div
                  key={route.id}
                  className={`menu-item menu-accordion ${
                    openMenus.includes(route?.id) ? "show" : ""
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
                      openMenus.includes(route.id) ? "show" : "collapse"
                    }`}
                  >
                    {route?.subRoutes?.map((subRoute) => (
                      <div
                        className={"menu-item " + subRoute?.id}
                        key={subRoute?.id}
                        onClick={() => handleMenuClick(subRoute?.id)}
                      >
                        <NavLink
                          className="menu-link"
                          to={subRoute?.path}
                        >
                          <span className="menu-icon">
                            <i className={subRoute?.icon}></i>
                          </span>
                          <span className="menu-title">
                            {subRoute?.title}
                          </span>
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
    </div>
  );
};

export default Sidebar;
