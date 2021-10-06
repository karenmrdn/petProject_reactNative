import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ArticlesOverviewScreen = props => {
  return (
    <View style={styles.centered}>
      <Text>ArticlesOverviewScreen</Text>
    </View>
  );
};

export const articleOverviewOptions = {
  headerTitle: "Articles",
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ArticlesOverviewScreen;
