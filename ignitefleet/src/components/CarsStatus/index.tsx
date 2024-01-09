import { Car, Key } from "phosphor-react-native";
import { Container, IconBox, Message, TextHighligh } from "./styles";
import { useTheme } from "styled-components";

type CarStatusProps = {
  licensePlate?: string | null;
};

export function CarStatus({ licensePlate = null }: CarStatusProps) {
  const theme = useTheme();
  const Icon = licensePlate ? Key : Car;

  const message = licensePlate
    ? ` Veículo ${licensePlate} em uso.`
    : `Nenhum veículo em uso.`;

  const status = licensePlate ? "chegada" : "saída";

  return (
    <Container>
      <IconBox>
        <Icon size={32} color={theme.COLORS.BRAND_LIGHT} />
      </IconBox>

      <Message>
        {message}

        <TextHighligh>Clique aqui para registrar a {status}</TextHighligh>
      </Message>
    </Container>
  );
}
