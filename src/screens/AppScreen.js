import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AppScreen = props => {
  return (
    <View style={styles.centered}>
      <Text>AppScreen</Text>
    </View>
  );
};

export const appOptions = {
  headerTitle: "Main Screen",
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppScreen;
