import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import defaultNavOptions from "../../constants/defaultNavOptions";
import AppScreen, { appOptions } from "../../screens/AppScreen";

const AppStackNavigator = createStackNavigator();

const AppNavigator = () => {
  return (
    <AppStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AppStackNavigator.Screen
        name="App"
        component={AppScreen}
        options={appOptions}
      />
    </AppStackNavigator.Navigator>
  );
};

export default AppNavigator;
