import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import colors from "../constants/colors";
import firestore from "@react-native-firebase/firestore";

const ArticleDetailsScreen = props => {
  const params = props.route.params;
  const creationDate = new Date(params.timestamp).toLocaleString();
  const [isGettingAuthorData, setIsGettingAuthorData] = useState(true);
  const [displayName, setDisplayName] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(true);

  useEffect(() => {
    firestore()
      .collection("users")
      .doc(params.authorId)
      .get()
      .then(user => {
        setDisplayName(user.data().displayName);
        setPhotoUrl(user.data().photoUrl);
        setIsGettingAuthorData(false);
      });
  }, []);

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
          {isGettingAuthorData ? (
            <View style={styles.centered}>
              <ActivityIndicator color={colors.secondary.main} size="large" />
            </View>
          ) : (
            <View style={styles.authorContainer}>
              <Image
                style={styles.authorAvatar}
                source={
                  photoUrl
                    ? { uri: photoUrl }
                    : require("../assets/noImage.jpg")
                }
              />
              <View>
                <Text style={styles.authorName}>
                  {displayName ?? params.email}
                </Text>
                <Text style={styles.date}>{creationDate}</Text>
              </View>
            </View>
          )}
          <Text style={styles.body}>{params.body}</Text>
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
  body: {
    fontSize: 16,
    paddingBottom: 16,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
});

export const articleDetailsOptions = {
  headerTitle: "Article details",
};

export default ArticleDetailsScreen;
