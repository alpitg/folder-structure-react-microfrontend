import authReducer, { initialStateAuth } from "./auth/auth.slice";

import { combineSlices } from "@reduxjs/toolkit";

export const coreReducer = combineSlices({
    [authReducer.name]: authReducer.reducer
})

export const initialStateCore = {
    auth: initialStateAuth
}

