import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import defaultNavOptions from "../../constants/defaultNavOptions";
import AuthScreen, { authOptions } from "../../screens/AuthScreen";

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
