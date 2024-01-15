import { Linking, Platform } from "react-native";

export function openSettings() {
  /* abre as configurações tanto no android quanto no ios, as duas sao diferentes uma da outra */

  if (Platform.OS === "ios") {
    return Linking.openURL("app-settings:*");
  }
  if (Platform.OS === "android") {
    return Linking.openSettings();
  }
}
