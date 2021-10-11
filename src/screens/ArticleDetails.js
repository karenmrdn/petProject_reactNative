import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import colors from "../constants/colors";

const ArticleDetails = props => {
  const params = props.route.params;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.tagsContainer}>
            {params.tags?.map(tag => (
              <View style={styles.tagItem} key={tag}>
                <Text>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.header}>{params.header}</Text>
          <Image source={{ uri: params.imageUrl }} style={styles.image} />
          <View style={styles.authorContainer}>
            <Image
              style={styles.authorAvatar}
              source={require("../assets/noImage.jpg")}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.authorName}>Name Surname</Text>
              <Text style={styles.date}>Feb 01, 1970 - 00:01</Text>
            </View>
          </View>
          <Text>{params.body}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 4,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tagItem: {
    padding: 8,
    marginRight: 8,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  authorContainer: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center",
  },
  authorAvatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: colors.secondary.main,
    borderWidth: 2,
    marginRight: 12,
  },
  authorName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {},
});

export const articleDetailsOptions = {
  headerTitle: "Article details",
};

export default ArticleDetails;
