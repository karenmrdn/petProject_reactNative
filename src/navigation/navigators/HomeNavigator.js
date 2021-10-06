import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import colors from "../../constants/colors";
import defaultNavOptions from "../../constants/defaultNavOptions";
import ArticlesOverviewScreen, {
  articleOverviewOptions,
} from "../../screens/ArticlesOverviewScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserScreen, { userOptions } from "../../screens//UserScreen";

const HomeTabNavigator = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <HomeTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "ArticlesOverview") {
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
        name="ArticlesOverview"
        component={ArticlesOverviewScreen}
        options={articleOverviewOptions}
      />
      <HomeTabNavigator.Screen
        name="User"
        component={UserScreen}
        options={userOptions}
      />
    </HomeTabNavigator.Navigator>
  );
};

export default HomeNavigator;
