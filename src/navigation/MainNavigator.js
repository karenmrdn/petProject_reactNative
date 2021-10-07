import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import HomeNavigator from "./navigators/HomeNavigator";
import AuthNavigator from "./navigators/AuthNavigator";
import ErrorModal from "../components/ErrorModal";

const MainNavigator = props => {
  const idToken = useSelector(state => state.auth.idToken);
  const error = useSelector(state => state.errors.error);

  return (
    <NavigationContainer>
      {!idToken && <AuthNavigator />}
      {idToken && <HomeNavigator />}
      {!!error && <ErrorModal />}
    </NavigationContainer>
  );
};

export default MainNavigator;
