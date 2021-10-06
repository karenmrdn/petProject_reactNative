import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    idToken: null,
    isGettingAuthData: false,
  },
  reducers: {
    setToken(state, action) {
      state.idToken = action.payload;
    },
    toggleIsGettingAuthData(state, action) {
      state.isGettingAuthData = !state.isGettingAuthData;
    },
    logout(state, action) {
      state.idToken = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
