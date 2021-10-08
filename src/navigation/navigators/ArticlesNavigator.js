import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticleDetails, {
  articleDetailsOptions,
} from "../../components/article/ArticleDetails";
import defaultNavOptions from "../../constants/defaultNavOptions";
import ArticlesOverviewScreen, {
  articleOverviewOptions,
} from "../../screens/ArticlesOverviewScreen";

const ArticlesStackNavigator = createStackNavigator();

const ArticlesNavigator = () => {
  return (
    <ArticlesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ArticlesStackNavigator.Screen
        name="ArticlesOverview"
        component={ArticlesOverviewScreen}
        options={articleOverviewOptions}
      />
      <ArticlesStackNavigator.Screen
        name="ArticleDetails"
        component={ArticleDetails}
        options={articleDetailsOptions}
      />
    </ArticlesStackNavigator.Navigator>
  );
};

export default ArticlesNavigator;
