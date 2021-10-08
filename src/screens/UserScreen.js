import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import { useDispatch } from "react-redux";
import { signOut } from "../store/auth/authThunks";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";

const UserScreen = () => {
  const dispatch = useDispatch();
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.wrapper}>
      <ButtonPrimary title="Logout" onPress={() => dispatch(signOut())} />
      <View style={styles.centered}>
        <View style={styles.touchableContainer}>
          <TouchableComponent>
            <View style={styles.iconContainer}>
              <Icon name="add" size={32} color="#fff" />
            </View>
          </TouchableComponent>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 16,
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableContainer: {
    borderRadius: 22,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  iconContainer: {
    backgroundColor: colors.secondary.main,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const userOptions = {
  headerTitle: "Workshop",
};

export default UserScreen;
