import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import colors from "../constants/colors";

const ValidatedTextInput = props => {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <TextInput
        style={[
          styles.textInput,
          !!props.error && !!props.touched && styles.errorTextInput,
        ]}
        {...props}
      />
      {!!props.error && !!props.touched && (
        <Text style={styles.errorText}>{props.error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  inputLabel: {
    textAlign: "center",
    fontWeight: "bold",
  },
  textInput: {
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  errorTextInput: {
    borderColor: colors.error.main,
    backgroundColor: colors.error.light,
  },
  errorText: {
    color: colors.error.main,
  },
});

export default ValidatedTextInput;
