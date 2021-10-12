import React, { useEffect, useState } from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { fetchArticles } from "./src/store/articles/articlesThunks";
// import { View, StyleSheet, ActivityIndicator } from "react-native";

GoogleSignin.configure({
  webClientId:
    "788516196793-e5gf65l5tggd24d5sgsj66c0rihk8e4l.apps.googleusercontent.com",
});

const App = () => {
  const dispatch = useDispatch();
  // const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchArticles());
    // setIsDataLoading(false);
  }, []);

  // if (isDataLoading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return <MainNavigator />;
};

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

export default App;
