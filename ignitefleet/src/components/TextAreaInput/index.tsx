import { TextInput, TextInputProps } from "react-native";
import { Container, Input, Label } from "./styles";
import theme from "../../theme";
import { forwardRef } from "react";

type TextAreaInputProps = TextInputProps & {
  label: string;
};

/* o forwardRef faz com que um componente criado personalizado receba um ref para ser passado para um componente react ou react-native
  que possui a propriedade ref como padrao, ref pega a referencia da arvore da dom
*/

const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <Container>
        <Label>{label}</Label>

        <Input
          ref={ref}
          multiline
          autoCapitalize="sentences"
          placeholderTextColor={theme.COLORS.GRAY_400}
          {...rest}
        />
      </Container>
    );
  }
);

export { TextAreaInput };
