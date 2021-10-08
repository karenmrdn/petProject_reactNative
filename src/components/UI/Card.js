import React from "react";
import { View, StyleSheet } from "react-native";

const Card = props => {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});

export default Card;
