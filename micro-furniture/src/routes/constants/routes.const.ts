const SALES_ROUTE_URL = {
  BASE: "crm/sales",
  ORDER: {
    BASE: "crm/sales/order",
    LIST: "crm/sales/order/list",
    VIEW: "crm/sales/order/:orderId",
    ADD: "crm/sales/order/add",
    EDIT: "crm/sales/order/:orderId/edit",
  },
};

const CATALOG = {
  BASE: "/crm/catalog",
  PRODUCT: {
    BASE: "/crm/catalog/product",
    LIST: "/crm/catalog/product/list",
    ADD: "/crm/catalog/product/add",
    EDIT: "/crm/catalog/product/edit/:id",
  },
  CATEGORY: {
    BASE: "crm/catalog/category",
    LIST: "crm/catalog/category/list",
    VIEW: "crm/catalog/category/:id",
    ADD: "crm/catalog/category/add",
    EDIT: "crm/catalog/category/edit/:id",
  },
};

const CUSTOMER_ROUTE_URL = {
  BASE: "crm/customer",
  LIST: "crm/customer/list",
  VIEW: "crm/customer/:id",
  ADD: "crm/customer/add",
  EDIT: "crm/customer/:id/edit",
};

export const ROUTE_URL = {
  HOME: "/crm",
  WEBSITE: {
    BASE: "",
    ABOUT: "/about",
    CONTACT: "/contact",
    PRODUCTS: "/products",
    PRODUCT_DETAILS: "/products/:id",
    CART: "/cart",
  },

  DASHBOARD: "/crm/dashboard",
  ADMIN_DASHBOARD: "/crm/admin-dashboard",
  LOGIN: "/crm/login",
  FORGET_PASSWORD: "/crm/forget-password",
  RESET_PASSWORD: "/crm/reset-password",
  FORBIDDEN: "/crm/forbidden",
  REGISTER: "/crm/register",
  ABOUT: "/crm/about",
  CONTACT: "/crm/contact",
  UI: "/crm/ui",
  NOT_ALLOWED: "/crm/not-allowed",
  SOCIAL_MEDIA_MANAGEMENT: "/social-media",
  CUSTOMER: CUSTOMER_ROUTE_URL,
  SALES: SALES_ROUTE_URL,
  CATALOG: CATALOG,
  ADMINISTRATION: {
    BASE: "/crm/admin",
    ORGANIZATION_UNIT: {
      BASE: "/crm/admin/organization-units",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    ROLES: {
      BASE: "/crm/admin/roles",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    USERS: {
      BASE: "/crm/admin/users",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    SUBSCRIPTION_MANAGEMENT: "subscription-management",
  },
  INVOICE_MANAGER: {
    BASE: "/crm/invoice",
    CREATE: "/crm/invoice/create",
    VIEW: "/crm/invoice/view",
  },
  MASTER: {
    BASE: "/crm/master",
    PRODUCTS: {
      BASE: "/crm/master/products",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    FRAME_TYPES: {
      BASE: "/crm/master/frame-types",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    GLASS_TYPES: {
      BASE: "/crm/master/glass-types",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    MISC_CHARGES: {
      BASE: "/crm/master/misc-charges",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    MOUNT_TYPES: {
      BASE: "/crm/master/mount-types",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
  },
  BILLS: "/crm/bills",
  APP_SETTINGS: "/crm/app-settings",
  TENANT_SETTINGS: "/crm/tenant-settings",
};
