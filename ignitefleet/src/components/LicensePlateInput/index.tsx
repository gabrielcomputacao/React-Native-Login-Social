import { TextInputProps } from "react-native";
import theme from "../../theme";
import { Container, Input, Label } from "./styles";

type LicensePlateInputProps = TextInputProps & {
  label: string;
};

export function LicensePlateInput({ label, ...rest }: LicensePlateInputProps) {
  return (
    <Container>
      <Label>{label}</Label>

      <Input
        maxLength={7}
        autoCapitalize="characters"
        placeholderTextColor={theme.COLORS.GRAY_400}
        {...rest}
      />
    </Container>
  );
}
