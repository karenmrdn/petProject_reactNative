import React from "react";
import { View, StyleSheet, Text } from "react-native";

const UserScreen = () => {
  return (
    <View style={styles.centered}>
      <Text>UserScreen</Text>
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
