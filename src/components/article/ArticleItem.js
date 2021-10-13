import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const ArticleItem = props => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <TouchableComponent useForeground onPress={props.onPress}>
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
        <Text style={styles.header}>{props.header}</Text>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderColor: "#ddd",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 4,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
  },
  tagsContainer: {
    flex: 1,
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
