import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import AppNavigator from "./components/AppNavigator";
import AuthNavigator from "./components/AuthNavigator";

const MainNavigator = props => {
  const idToken = useSelector(state => state.auth.idToken);

  return (
    <NavigationContainer>
      {!idToken && <AuthNavigator />}
      {idToken && <AppNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
