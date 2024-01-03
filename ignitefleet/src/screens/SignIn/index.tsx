import { ThemeProvider } from "styled-components/native";

import { Text, View } from "react-native";
import theme from "../../theme";

import { styles } from "./styles";

export function SignIn() {
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text>Hello , world</Text>
      </View>
    </ThemeProvider>
  );
}
