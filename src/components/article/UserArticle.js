import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../../constants/colors";
import ButtonPrimary from "../UI/ButtonPrimary";
import Icon from "react-native-vector-icons/Ionicons";

const UserArticle = props => {
  return (
    <View style={[styles.wrapper, props.styles]}>
      <Image source={{ uri: props.imageUrl }} style={styles.image} />
      <Text style={styles.header}>{props.header}</Text>
      <View style={styles.actionsContainer}>
        <ButtonPrimary
          title="Delete"
          color={colors.error.e900}
          style={styles.btn}
        />
        <ButtonPrimary title="Edit" style={styles.btn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 4,
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: { width: "45%" },
});

export default UserArticle;
