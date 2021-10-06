import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import HomeNavigator from "./navigators/HomeNavigator";
import AuthNavigator from "./navigators/AuthNavigator";

const MainNavigator = props => {
  const idToken = useSelector(state => state.auth.idToken);

  return (
    <NavigationContainer>
      {!idToken && <AuthNavigator />}
      {idToken && <HomeNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
