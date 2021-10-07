import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth/authSlice";
import { signOut } from "../store/auth/authThunks";
import colors from "../constants/colors";

const UserScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.centered}>
      <ButtonPrimary title="Logout" onPress={() => dispatch(signOut())} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const userOptions = {
  headerTitle: "Workshop",
};

export default UserScreen;
