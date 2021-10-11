import { AppRegistry } from "react-native";
import AppContainer from "./AppContainer";
import { name as appName } from "./app.json";
import "react-native-gesture-handler";

AppRegistry.registerComponent(appName, () => AppContainer);
