import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/colors";

const ButtonSecondary = props => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={[styles.container, props.style]}>
      <TouchableComponent style={{ flex: 1 }}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{props.title}</Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.secondary.main,
    borderWidth: 3,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
    elevation: 8,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default ButtonSecondary;
