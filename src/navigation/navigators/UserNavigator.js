import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewArticleScreen, {
  newArticleOptions,
} from "../../screens/NewArticleScreen";
import UserScreen, { userOptions } from "../../screens/UserScreen";
import defaultNavOptions from "../../constants/defaultNavOptions";
import EditProfileScreen, {
  editProfileOptions,
} from "../../screens/EditProfileScreen";

const UserStackNavigator = createStackNavigator();

const UserNavigator = () => {
  return (
    <UserStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserStackNavigator.Screen
        name="Workshop"
        component={UserScreen}
        options={userOptions}
      />
      <UserStackNavigator.Screen
        name="NewArticle"
        component={NewArticleScreen}
        options={newArticleOptions}
      />
      <UserStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={editProfileOptions}
      />
    </UserStackNavigator.Navigator>
  );
};

export default UserNavigator;
