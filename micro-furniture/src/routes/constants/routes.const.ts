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
  HOME: "",
  WEBSITE: {
    BASE: "",
    ABOUT: "/about",
    CONTACT: "/contact",
    PRODUCTS: "/products",
    PRODUCT_DETAILS: "/products/:id",
    CART: "/cart",
  },

  DASHBOARD: "/crm",
  LOGIN: "/login",
  FORGET_PASSWORD: "/forget-password",
  RESET_PASSWORD: "/reset-password",
  FORBIDDEN: "/forbidden",
  REGISTER: "/register",
  ABOUT: "/about",
  CONTACT: "/contact",
  UI: "/ui",
  NOT_ALLOWED: "/not-allowed",
  SOCIAL_MEDIA_MANAGEMENT: "/social-media",
  CUSTOMER: CUSTOMER_ROUTE_URL,
  SALES: SALES_ROUTE_URL,
  CATALOG: CATALOG,
  ADMINISTRATION: {
    BASE: "/admin",
    ORGANIZATION_UNIT: {
      BASE: "/admin/organization-units",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    ROLES: {
      BASE: "/admin/roles",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    USERS: {
      BASE: "/admin/users",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
  },
  INVOICE_MANAGER: {
    BASE: "/invoice",
    CREATE: "/invoice/create",
    VIEW: "/invoice/view",
  },
  MASTER: {
    BASE: "/master",
    PRODUCTS: {
      BASE: "/master/products",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    FRAME_TYPES: {
      BASE: "/master/frame-types",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    GLASS_TYPES: {
      BASE: "/master/glass-types",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    MISC_CHARGES: {
      BASE: "/master/misc-charges",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    MOUNT_TYPES: {
      BASE: "/master/mount-types",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
  },
  BILLS: "/bills",
  APP_SETTINGS: "/app-settings",
  TENANT_SETTINGS: "/tenant-settings",
  ADMIN: {
    BASE: "/admin",
    ORGANIZATION_UNITS: {
      BASE: "/organization-units",
      LIST: "",
      EDIT: "edit/:id",
      ADD: "add",
    },
    TENANT: {
      BASE: "/tenant",
      LIST: "",
      DETAIL: ":id",
      EDIT: "edit/:id",
      ADD: "add",
    },
    ROLE: {
      BASE: "/role",
      LIST: "",
      DETAIL: ":id",
      EDIT: "edit/:id",
      ADD: "add",
    },
    USER: {
      BASE: "/user",
      LIST: "",
      DETAIL: ":id",
      EDIT: "edit/:id",
      ADD: "add",
      PERMISSIONS: "permissions/:id",
    },
    SUBSCRIPTION_MANAGEMENT: "subscription-management",
  },
};
