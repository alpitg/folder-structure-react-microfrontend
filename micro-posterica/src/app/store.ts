import { configureStore } from "@reduxjs/toolkit";
import coreReducer from "./features/core/core.reducer";
import masterReducer from "./features/master/master.reducer";

const store = configureStore({
  reducer: {
    core: coreReducer,
    master: masterReducer,
  }, // Add your reducers here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable data
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;
