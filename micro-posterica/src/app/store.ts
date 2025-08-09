import { configureStore } from "@reduxjs/toolkit";
import coreReducer from "./features/core/core.reducer";
import { customersApi } from "./features/customer/list/customer.api";
import masterReducer from "./features/master/master.reducer";
import { ordersApi } from "./features/sales/order/order.api";
import salesReducer from "./features/sales/sales.reducer";

const store = configureStore({
  reducer: {
    core: coreReducer,
    master: masterReducer,
    sales: salesReducer,

    [ordersApi.reducerPath]: ordersApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
  }, // Add your reducers here

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable data
    }).concat(ordersApi.middleware, customersApi.middleware),

  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;
