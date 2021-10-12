import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    displayName: "",
    email: "",
    photoUrl: "",
    isGettingAuthData: false,
  },
  reducers: {
    toggleIsGettingAuthData(state, action) {
      state.isGettingAuthData = !state.isGettingAuthData;
    },
    setUserData(state, action) {
      state.userId = action.payload.userId;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
