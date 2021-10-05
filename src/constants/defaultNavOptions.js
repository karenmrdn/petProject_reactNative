import { Platform } from "react-native";
import colors from "../constants/colors";

const isAndroid = Platform.OS === "android";

const defaultNavOptions = {
  headerStyle: { backgroundColor: isAndroid ? colors.primary.main : "#fff" },
  headerTintColor: isAndroid ? "#fff" : colors.primary.main,
};

export default defaultNavOptions;
