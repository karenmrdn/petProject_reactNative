import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image,
  Text,
} from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/auth/authThunks";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";

const UserScreen = () => {
  const dispatch = useDispatch();
  const displayName = useSelector(state => state.auth.displayName);
  const email = useSelector(state => state.auth.email);
  const photoUrl = useSelector(state => state.auth.photoUrl);

  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.infoBlock}>
        <Image
          source={
            photoUrl ? { uri: photoUrl } : require("../assets/noImage.jpg")
          }
          style={styles.avatar}
        />
        <View>
          <Text style={styles.displayName}>
            {displayName ? displayName : email}
          </Text>
          {displayName && <Text>{email}</Text>}
        </View>
      </View>
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
  infoBlock: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.secondary.main,
    marginRight: 16,
  },
  displayName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.secondary.main,
    // marginBottom: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableContainer: {
    borderRadius: 22,
    overflow: "hidden",
    // elevation: 8,
    // shadowColor: "#000",
    // shadowOffset: { width: 2, height: 0 },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
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
