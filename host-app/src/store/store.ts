import { configureStore } from "@reduxjs/toolkit";
import { coreReducer } from "./core/core.state";

export const store = configureStore({
    reducer: {
        core: coreReducer
    }
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch