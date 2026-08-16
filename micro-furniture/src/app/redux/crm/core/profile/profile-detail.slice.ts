import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "./profile-detail.thunk";

export interface IProfile {
  name: string;
  address: string;
  phone: string;
  website: string;
}

export interface IProfileState {
  profile: IProfile;
}

const initialState: IProfileState = {
  profile: {
    name: "",
    address: "",
    phone: "",
    website: "",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default profileSlice;
