import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArticleDetailsScreen, {
  articleDetailsOptions,
} from "../../screens/ArticleDetailsScreen";
import defaultNavOptions from "../../constants/defaultNavOptions";
import ArticlesOverviewScreen, {
  articleOverviewOptions,
} from "../../screens/ArticlesOverviewScreen";
import NewArticleScreen, {
  newArticleOptions,
} from "../../screens/NewArticleScreen";

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
        component={ArticleDetailsScreen}
        options={articleDetailsOptions}
      />
      <ArticlesStackNavigator.Screen
        name="NewArticle"
        component={NewArticleScreen}
        options={newArticleOptions}
      />
    </ArticlesStackNavigator.Navigator>
  );
};

export default ArticlesNavigator;
