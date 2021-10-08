import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import ArticleItem from "../components/ArticleItem";

const ArticlesOverviewScreen = props => {
  const articles = useSelector(state => state.articles.articles);

  if (articles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noArticlesText}>
          There is no articles yet.{"\n"}But you can always add them!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={articles}
        renderItem={article => (
          <ArticleItem
            style={styles.articleItem}
            header={article.item.header}
            imageUrl={article.item.imageUrl}
            tags={article.item.tags}
          />
        )}
      />
    </SafeAreaView>
  );
};

export const articleOverviewOptions = {
  headerTitle: "Articles",
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noArticlesText: {
    fontWeight: "bold",
    margin: 16,
    textAlign: "center",
  },
  articleItem: {
    margin: 16,
    marginBottom: 0,
  },
});

export default ArticlesOverviewScreen;
