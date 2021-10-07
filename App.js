import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import StoreProvider from "./src/store/StoreProvider";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "788516196793-e5gf65l5tggd24d5sgsj66c0rihk8e4l.apps.googleusercontent.com",
});

const App = () => {
  return (
    <StoreProvider>
      <MainNavigator />
    </StoreProvider>
  );
};

export default App;
