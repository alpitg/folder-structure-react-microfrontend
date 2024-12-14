import { authThunk } from "./auth.thunk";
import { createSlice } from "@reduxjs/toolkit";

export const initialStateAuth = {
    isAuthorized: false
}

export const authReducer = createSlice({
    name: 'auth',
    initialState: initialStateAuth,
    reducers: {
        updateLoader: (state: any, action) => {
            state.pending = action?.payload ?? false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authThunk.pending, (state: any) => {
                state.pending = true
                state.isResolved = false
            })
            .addCase(authThunk.fulfilled, (state: any) => {
                state.pending = false
                state.isResolved = true
            })
            .addCase(authThunk.rejected, (state: any, action: any) => {
                state.pending = false
                state.isResolved = true
                state.error = action?.payload
            })
    }
})

export default authReducer

export const {
    updateLoader
} = authReducer.actions