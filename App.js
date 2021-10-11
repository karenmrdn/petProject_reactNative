import React, { useEffect } from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { fetchArticles } from "./src/store/articles/articlesThunks";

GoogleSignin.configure({
  webClientId:
    "788516196793-e5gf65l5tggd24d5sgsj66c0rihk8e4l.apps.googleusercontent.com",
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return <MainNavigator />;
};

export default App;
