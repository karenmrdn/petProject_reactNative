import React from "react";
import { StyleSheet } from "react-native";
import MainNavigator from "./src/navigation/MainNavigator";
import StoreProvider from "./src/store/StoreProvider";

const App = () => {
  return (
    <StoreProvider>
      <MainNavigator />
    </StoreProvider>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
