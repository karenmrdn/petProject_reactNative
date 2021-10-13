import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import ButtonPrimary from "../components/UI/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/auth/authThunks";
import colors from "../constants/colors";
import UserArticle from "../components/article/UserArticle";
import CircularButton from "../components/UI/CircularButton";
import { deleteArticleAsync } from "../store/articles/articlesThunks";
import AnimatedWrapper from "../components/UI/AnimatedWrapper";

const UserScreen = props => {
  const dispatch = useDispatch();
  const displayName = useSelector(state => state.auth.displayName);
  const email = useSelector(state => state.auth.email);
  const photoUrl = useSelector(state => state.auth.photoUrl);
  const userId = useSelector(state => state.auth.userId);
  const userArticles = useSelector(state =>
    state.articles.articles?.filter(article => article.authorId === userId),
  );

  const handleArticleDelete = articleId => {
    Alert.alert("Are you sure?", "The article will be deleted permanently.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => dispatch(deleteArticleAsync(articleId)),
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <View style={styles.infoBlock}>
          <Image
            source={
              photoUrl ? { uri: photoUrl } : require("../assets/noImage.jpg")
            }
            style={styles.avatar}
          />
          <View>
            <Text style={styles.displayName}>
              {displayName ? displayName : email}
            </Text>
            {displayName && <Text>{email}</Text>}
          </View>
        </View>
        <ButtonPrimary
          title="Logout"
          onPress={() => dispatch(signOut())}
          style={styles.btn}
        />
        {userArticles.length === 0 ? (
          <View style={styles.centered}>
            <AnimatedWrapper>
              <CircularButton
                iconName="add"
                onPress={() => {
                  props.navigation.navigate("NewArticle");
                }}
              />
            </AnimatedWrapper>
          </View>
        ) : (
          <View style={styles.usersArticles}>
            <Text style={styles.articlesText}>List of your articles</Text>
            <ScrollView>
              <View style={styles.articlesContainer}>
                {userArticles.map(article => (
                  <UserArticle
                    key={article.id}
                    imageUrl={article.imageUrl}
                    header={article.header}
                    body={article.body}
                    tags={article.tags}
                    onDelete={() => handleArticleDelete(article.id)}
                    onEdit={() => console.log("Edit")}
                  />
                ))}
                <CircularButton
                  iconName="add"
                  style={styles.floatingBtn}
                  onPress={() => {
                    props.navigation.navigate("NewArticle");
                  }}
                />
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 16,
    marginBottom: 0,
  },
  infoBlock: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.secondary.main,
    marginRight: 16,
  },
  displayName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.secondary.main,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  articlesText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  floatingBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  usersArticles: {
    flex: 1,
    marginBottom: 8,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 8,
  },
  btn: { marginBottom: 16 },
});

export const userOptions = {
  headerTitle: "Workshop",
};

export default UserScreen;
