import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { Provider } from "react-redux";
import articlesReducer from "./articles/articlesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
  },
});

const StoreProvider = props => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default StoreProvider;
