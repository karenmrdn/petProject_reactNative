import { createSlice } from "@reduxjs/toolkit";

const errorsSlice = createSlice({
  name: "Errors",
  initialState: {
    error: null,
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const errorsActions = errorsSlice.actions;

export default errorsSlice.reducer;
