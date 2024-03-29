import "react-native-get-random-values";
import { SignIn } from "./src/screens/SignIn";

import "./src/libs/dayjs";

import { ThemeProvider } from "styled-components/native";

import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import theme from "./src/theme";
import { Loading } from "./src/components/Loading";
import { StatusBar } from "react-native";

import { AppProvider, UserProvider } from "@realm/react";
import { REALM_APP_ID } from "@env";

import { Routes } from "./src/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RealmProvider, syncConfig } from "./src/libs/realm";
import { TopMessage } from "./src/components/TopMessage";
import { WifiSlash } from "phosphor-react-native";
import { useNetInfo } from "@react-native-community/netinfo";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  /* biblioteca netinfo que ajuda verificar se o usuario está ou nao com internet */
  const netInfo = useNetInfo();

  /* com.gabrielh.ignitefleet */

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        {/* para evitar que ao trocar de pagina pela navegação o fundo fique branco entre as trocas */}
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />

          {!netInfo.isConnected && (
            <TopMessage title="Voce está offline" icon={WifiSlash} />
          )}

          {/* se nao estiver logado vai levar para o signin para o usuario logar, caso tenha leva a home */}
          <UserProvider fallback={SignIn}>
            <RealmProvider sync={syncConfig} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
