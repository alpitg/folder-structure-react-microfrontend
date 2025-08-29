const SALES_ROUTE_URL = {
  BASE: "/sales",
  ORDER: {
    BASE: "/sales/order",
    LIST: "/sales/order/list",
    VIEW: "/sales/order/:orderId",
    ADD: "/sales/order/add",
    EDIT: "/sales/order/:orderId/edit",
  },
};

const CATALOG = {
  BASE: "/catalog",
  PRODUCT: {
    BASE: "/catalog/product",
    LIST: "/catalog/product/list",
    ADD: "/catalog/product/add",
    EDIT: "/catalog/product/edit/:id",
  },
  CATEGORY: {
    BASE: "/catalog/category",
    LIST: "/catalog/category/list",
    VIEW: "/catalog/category/:id",
    ADD: "/catalog/category/add",
    EDIT: "/catalog/category/edit/:id",
  },
};

const CUSTOMER_ROUTE_URL = {
  BASE: "/customer",
  LIST: "/customer/list",
  VIEW: "/customer/:id",
  ADD: "/customer/add",
  EDIT: "/customer/:id/edit",
};

export const ROUTE_URL = {
  HOME: "",
  DASHBOARD: "/",
  LOGIN: "/login",
  FORGET_PASSWORD: "/forget-password",
  RESET_PASSWORD: "/reset-password",
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
