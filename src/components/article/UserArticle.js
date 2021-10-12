import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import colors from "../../constants/colors";
import ButtonPrimary from "../UI/ButtonPrimary";
import { useSelector } from "react-redux";

const UserArticle = props => {
  const isArticlesLoading = useSelector(
    state => state.articles.isArticlesLoading,
  );

  return (
    <View style={[styles.wrapper, props.styles]}>
      <Image source={{ uri: props.imageUrl }} style={styles.image} />
      <Text style={styles.header}>{props.header}</Text>
      <View style={styles.actionsContainer}>
        {isArticlesLoading ? (
          <ActivityIndicator size="large" color={colors.primary.main} />
        ) : (
          <>
            <ButtonPrimary
              title="Delete"
              color={colors.error.e900}
              style={styles.btn}
              onPress={props.onDelete}
            />
            <ButtonPrimary
              title="Edit"
              style={styles.btn}
              onPress={props.onEdit}
            />
          </>
        )}
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
