import { Container, Greeting, Message, Name } from "./styles";

export function HomeHeader() {
  return (
    <Container>
      <Greeting>
        <Message>Olá</Message>
        <Name>Gabriel</Name>
      </Greeting>
    </Container>
  );
}
