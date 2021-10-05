import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MainNavigator from "./src/navigation/MainNavigator";

const App = () => {
  return <MainNavigator />;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
