import { Text, View } from "react-native";
import { Container, Slogan, Title } from "./styles";

import backgroundImg from "../../assets/background.png";
import { Button } from "../../components/Button";

export function SignIn() {
  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>Gestão de Veículos</Slogan>

      <Button title="Entrar com o Google" />
    </Container>
  );
}
