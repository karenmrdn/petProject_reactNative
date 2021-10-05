import React from "react";
import { View, Button, StyleSheet } from "react-native";
import colors from "../constants/colors";

const CustomButton = props => {
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
    borderRadius: 8,
    elevation: 4,
  },
});

export default CustomButton;
