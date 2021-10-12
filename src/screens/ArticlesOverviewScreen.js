import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import ArticleItem from "../components/article/ArticleItem";

const ArticlesOverviewScreen = props => {
  const articles = useSelector(state => state.articles.articles);
  const isArticlesLoading = useSelector(
    state => state.articles.isArticlesLoading,
  );

  if (isArticlesLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
          <View>
            <ArticleItem
              style={styles.articleItem}
              header={article.item.header}
              imageUrl={article.item.imageUrl}
              tags={article.item.tags}
              onPress={() =>
                props.navigation.navigate("ArticleDetails", {
                  authorId: article.item.authorId,
                  imageUrl: article.item.imageUrl,
                  header: article.item.header,
                  body: article.item.body,
                  tags: article.item.tags,
                  timestamp: article.item.timestamp,
                })
              }
            />
          </View>
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
    padding: 16,
  },
});

export default ArticlesOverviewScreen;
