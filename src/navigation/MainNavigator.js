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
import { setUserDataAsync } from "../store/auth/authThunks";

const MainNavigator = props => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.errors.error);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({});

  const handleAuthStateChanged = async user => {
    setUser(user);
    // console.log(user);

    // dispatch(
    //   authActions.setUserData({
    //     userId: user?.uid,
    //     displayName: user?.displayName,
    //     email: user?.email,
    //     photoUrl: user?.photoURL,
    //   }),
    // );

    if (user) {
      await dispatch(
        setUserDataAsync(
          user.uid,
          user.displayName,
          user.email,
          user.photoURL,
        ),
      );
    }

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
