import { authApi } from "./redux/administration/auth/auth.api";
import { blobApi } from "./redux/blob/blob.api";
import catalogReducer from "./redux/catalog/catalog.reducer";
import { configureStore } from "@reduxjs/toolkit";
import coreReducer from "./redux/core/core.reducer";
import { customersApi } from "./redux/customer/customer.api";
import { dashboardApi } from "./redux/dashboard/dashboard.api";
import masterReducer from "./redux/master/master.reducer";
import { ordersApi } from "./redux/sales/order/order.api";
import { organizationUnitsApi } from "./redux/administration/organization-units/organization-units.api";
import { productsApi } from "./redux/catalog/product/product.api";
import { profileLoginApi } from "./redux/website/auth/profile-login.api";
import { rolesApi } from "./redux/administration/roles/roles.api";
import salesReducer from "./redux/sales/sales.reducer";
import { usersApi } from "./redux/administration/users/users.api";
import { websiteCartApi } from "./redux/website/cart/cart.api";
import { websiteOrderApi } from "./redux/website/order/website-order.api";
import { websiteProductApi } from "./redux/website/product/website-product.api";
import websiteReducer from "./redux/website/website.reducer";

const store = configureStore({
  reducer: {
    //#region administration
    core: coreReducer,
    master: masterReducer,
    sales: salesReducer,
    catalog: catalogReducer,

    [authApi.reducerPath]: authApi.reducer,
    [organizationUnitsApi.reducerPath]: organizationUnitsApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [blobApi.reducerPath]: blobApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    //#endregion

    //#region website
    website: websiteReducer,
    [websiteProductApi.reducerPath]: websiteProductApi.reducer,
    [websiteOrderApi.reducerPath]: websiteOrderApi.reducer,
    [profileLoginApi.reducerPath]: profileLoginApi.reducer,
    [websiteCartApi.reducerPath]: websiteCartApi.reducer,
    //#endregion
  }, // Add your reducers here

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable data
    }).concat(
      // administration
      authApi.middleware,
      organizationUnitsApi.middleware,
      rolesApi.middleware,
      usersApi.middleware,
      productsApi.middleware,
      ordersApi.middleware,
      customersApi.middleware,
      blobApi.middleware,
      dashboardApi.middleware,

      // website
      websiteProductApi.middleware,
      websiteOrderApi.middleware,
      profileLoginApi.middleware,
      websiteCartApi.middleware, // Add the website reducer middleware
    ),

  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;
