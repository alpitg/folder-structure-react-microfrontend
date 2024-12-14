import AuthService from "../../../api/api-service/auth.service";
import { AxiosError } from "axios";
import { FETCH_AUTH } from "./auth.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authThunk = createAsyncThunk(FETCH_AUTH, async (arg: any, { rejectWithValue }) => {
    const auth = await AuthService.fetchUser()
        .then((response) => response?.data)
        .catch((error) => {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.message);
        })
    return auth;
})
