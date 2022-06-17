import { createSlice } from "@reduxjs/toolkit";

const errorsSlice = createSlice({
  name: "Errors",
  initialState: {
    error: null,
    notification: null,
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const errorsActions = errorsSlice.actions;

export default errorsSlice.reducer;
