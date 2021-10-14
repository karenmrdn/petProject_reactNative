import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import colors from "../../constants/colors";
import defaultNavOptions from "../../constants/defaultNavOptions";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserScreen, { userOptions } from "../../screens//UserScreen";
import ArticlesNavigator from "./ArticlesNavigator";
import UserNavigator from "./UserNavigator";

const HomeTabNavigator = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <HomeTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Articles") {
            iconName = "reader-outline";
          } else if (route.name === "User") {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.secondary.main,
        tabBarActiveBackgroundColor: colors.primary.main,
        tabBarInactiveBackgroundColor: colors.primary.main,
        tabBarShowLabel: false,
        ...defaultNavOptions,
      })}>
      <HomeTabNavigator.Screen
        name="Articles"
        component={ArticlesNavigator}
        options={{ headerShown: false }}
      />
      <HomeTabNavigator.Screen
        name="User"
        component={UserNavigator}
        options={{ headerShown: false }}
      />
    </HomeTabNavigator.Navigator>
  );
};

export default HomeNavigator;
