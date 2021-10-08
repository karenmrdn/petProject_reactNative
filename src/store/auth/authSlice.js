import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    idToken: null,
    displayName: "",
    email: "",
    photoUrl: "",
    isGettingAuthData: false,
  },
  reducers: {
    // setToken(state, action) {
    //   state.idToken = action.payload;
    // },
    toggleIsGettingAuthData(state, action) {
      state.isGettingAuthData = !state.isGettingAuthData;
    },
    setUserData(state, action) {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
