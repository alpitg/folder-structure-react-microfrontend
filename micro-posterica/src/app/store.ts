import catalogReducer from "./redux/catalog/catalog.reducer";
import { configureStore } from "@reduxjs/toolkit";
import coreReducer from "./redux/core/core.reducer";
import { customersApi } from "./redux/customer/customer.api";
import masterReducer from "./redux/master/master.reducer";
import { ordersApi } from "./redux/sales/order/order.api";
import { organizationUnitsApi } from "./redux/administration/organization-units/organization-units.api";
import { productsApi } from "./redux/catalog/product/product.api";
import { rolesApi } from "./redux/administration/roles/roles.api";
import salesReducer from "./redux/sales/sales.reducer";
import { usersApi } from "./redux/administration/users/users.api";

const store = configureStore({
  reducer: {
    core: coreReducer,
    master: masterReducer,
    sales: salesReducer,
    catalog: catalogReducer,

    // administration
    [organizationUnitsApi.reducerPath]: organizationUnitsApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,

    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
  }, // Add your reducers here

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable data
    }).concat(
      // administration
      organizationUnitsApi.middleware,
      rolesApi.middleware,
      usersApi.middleware,

      productsApi.middleware,
      ordersApi.middleware,
      customersApi.middleware
    ),

  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;
