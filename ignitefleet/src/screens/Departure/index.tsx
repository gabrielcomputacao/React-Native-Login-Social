import { useRef } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { Container, Content } from "./styles";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";

export function Departure() {
  const descriptionRef = useRef<TextInput>(null);

  const keyboardAvoidingViewBehavior =
    Platform.OS === "android" ? "height" : "position";

  function handleDepartureRegister() {}

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={keyboardAvoidingViewBehavior}
      >
        <ScrollView>
          <Content>
            <LicensePlateInput
              label="Placa do Veículo"
              placeholder="BRSHD14"
              /* icone do celular de clica em concluir esta nessa função , e pode ser modificada */
              onSubmitEditing={() => descriptionRef.current?.focus()}
              /* icone do botao do celular dentro do teclado */
              returnKeyType="next"
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para ..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              /* propriedade que faz com que quando o blur sai do componente quer dizer que ele vai fazer o submitting no caso de um multline */
              blurOnSubmit
            />

            <Button title="Registrar Saída" onPress={handleDepartureRegister} />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
