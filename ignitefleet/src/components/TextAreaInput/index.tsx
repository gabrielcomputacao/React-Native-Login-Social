import { TextInputProps } from "react-native";
import { Container, Input, Label } from "./styles";
import theme from "../../theme";

type TextAreaInputProps = TextInputProps & {
  label: string;
};

export function TextAreaInput({ label }: TextAreaInputProps) {
  return (
    <Container>
      <Label>{label}</Label>

      <Input
        multiline
        autoCapitalize="sentences"
        placeholderTextColor={theme.COLORS.GRAY_400}
      />
    </Container>
  );
}
