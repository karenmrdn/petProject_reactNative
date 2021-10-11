import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";

const CircularButton = props => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={[styles.touchableContainer, props.style]}>
      <TouchableComponent>
        <View style={styles.iconContainer}>
          <Icon name={props.iconName} size={32} color="#fff" />
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    borderRadius: 22,
    overflow: "hidden",
  },
  iconContainer: {
    backgroundColor: colors.secondary.main,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default CircularButton;
