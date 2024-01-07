import { Container, Slogan, Title } from "./styles";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { Realm, useApp } from "@realm/react";

import backgroundImg from "../../assets/background.png";
import { Button } from "../../components/Button";

import { WEB_CLIENT_ID } from "@env";
import { useState } from "react";
import { Alert } from "react-native";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: WEB_CLIENT_ID,
});

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const app = useApp();

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true);

      const { idToken } = await GoogleSignin.signIn();

      console.log(idToken);

      if (idToken) {
        /* esse token que é enviado para o atlas db para ter o token la tambem */

        const credentials = Realm.Credentials.jwt(idToken);

        await app.logIn(credentials);
      } else {
        Alert.alert(
          "Entrar",
          "Não foi possivel conectar-se a sua conta google."
        );
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Entrar", "Não foi possivel conectar-se a sua conta google.");
      setIsAuthenticating(false);
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>Gestão de Veículos</Slogan>

      <Button
        title="Entrar com o Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
}
