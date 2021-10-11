import React from "react";
import StoreProvider from "./src/store/StoreProvider";
import App from "./App";

const AppContainer = () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
};

export default AppContainer;
