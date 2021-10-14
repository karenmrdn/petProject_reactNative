import React from "react";
import { View, Button, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const ButtonPrimary = props => {
  return (
    <View style={[styles.btnContainer, props.style]}>
      <Button
        title={props.title ?? "Default title"}
        color={props.color ?? colors.primary.main}
        onPress={props.onPress ?? (() => {})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    overflow: "hidden",
    borderRadius: 12,
    elevation: 4,
  },
});

export default ButtonPrimary;
