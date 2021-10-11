import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import HomeNavigator from "./navigators/HomeNavigator";
import AuthNavigator from "./navigators/AuthNavigator";
import ErrorModal from "../components/UI/ErrorModal";
import auth from "@react-native-firebase/auth";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth/authSlice";
import firestore from "@react-native-firebase/firestore";
import { articlesActions } from "../store/articles/articlesSlice";
// import Article from "../models/article";

// const onError = error => {
//   console.error(error);
// };

const MainNavigator = props => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.errors.error);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({});

  // const onResult = querySnapshot => {
  //   const articlesArr = [];
  //   querySnapshot.forEach(documentSnapshot => {
  //     const data = documentSnapshot._data;
  //     articlesArr.push(
  //       // new Article(
  //       //   documentSnapshot._ref._documentPath._parts[1],
  //       //   data.authorId,
  //       //   data.imageUrl,
  //       //   data.header,
  //       //   data.body,
  //       //   data.tags,
  //       // ),
  //       {
  //         id: documentSnapshot._ref._documentPath._parts[1],
  //         authorId: data.authorId,
  //         imageUrl: data.imageUrl,
  //         header: data.header,
  //         body: data.body,
  //         tags: data.tags,
  //       },
  //     );
  //   });
  //   console.log(articlesArr);
  //   dispatch(articlesActions.setArticles(articlesArr));
  // };

  // firestore().collection("articles").onSnapshot(onResult, onError);

  const handleAuthStateChanged = user => {
    setUser(user);
    dispatch(
      authActions.setUserData({
        displayName: user?.displayName,
        email: user?.email,
        photoUrl: user?.photoURL,
      }),
    );

    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.secondary.main} />
      </View>
    );

  return (
    <NavigationContainer>
      {!user && <AuthNavigator />}
      {!!user && <HomeNavigator />}
      {!!error && <ErrorModal />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainNavigator;
