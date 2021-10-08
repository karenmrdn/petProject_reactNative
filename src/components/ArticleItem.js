import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ArticleItem = props => {
  return (
    <View style={[styles.wrapper, props.style]}>
      <Image
        source={{
          uri: props.imageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.tagsContainer}>
        {props.tags?.map(tag => (
          <Text style={styles.tagItem} key={tag}>
            {tag}
          </Text>
        ))}
      </View>
      <Text style={styles.text}>{props.header}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderColor: "#ddd",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 4,
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  tagItem: {
    padding: 8,
    marginRight: 8,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
});

export default ArticleItem;
