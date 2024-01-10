import { useRef, useState } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { Container, Content } from "./styles";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { licensePlateValidate } from "../../utils/licensePlateValidate";

export function Departure() {
  const [description, setDescription] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const descriptionRef = useRef<TextInput>(null);
  const licensePlatenRef = useRef<TextInput>(null);

  const keyboardAvoidingViewBehavior =
    Platform.OS === "android" ? "height" : "position";

  function handleDepartureRegister() {
    if (!licensePlateValidate(licensePlate)) {
      licensePlatenRef.current?.focus();
      return Alert.alert(
        "placa inválida",
        "Placa Inválida. Digite uma placa correta."
      );
    }

    if (description.trim().length === 0) {
      return Alert.alert("Finalidade", "Informe a finalidade.");
    }
  }

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
              ref={licensePlatenRef}
              label="Placa do Veículo"
              placeholder="BRSHD14"
              /* icone do celular de clica em concluir esta nessa função , e pode ser modificada */
              onSubmitEditing={() => descriptionRef.current?.focus()}
              /* icone do botao do celular dentro do teclado */
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para ..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              /* propriedade que faz com que quando o blur sai do componente quer dizer que ele vai fazer o submitting no caso de um multline */
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button title="Registrar Saída" onPress={handleDepartureRegister} />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
