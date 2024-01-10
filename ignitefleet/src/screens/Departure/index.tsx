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
import { useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";

import { useUser } from "@realm/react";
import { useNavigation } from "@react-navigation/native";

export function Departure() {
  const [description, setDescription] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  /* com isso tem acesso ao bancode dados local */
  const realm = useRealm();
  const user = useUser();

  const { goBack } = useNavigation();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlatenRef = useRef<TextInput>(null);

  const keyboardAvoidingViewBehavior =
    Platform.OS === "android" ? "height" : "position";

  function handleDepartureRegister() {
    try {
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

      setIsRegistering(true);
      /* quando for mexer com dados sempre usar o write , porque ele usa transações, como cadastrar atualizar modificar, sempre o write */
      realm.write(() => {
        realm.create(
          "Historic",
          Historic.generate({
            description,
            license_plate: licensePlate.toUpperCase(),
            user_id: user!.id,
          })
        );
      });

      Alert.alert("Saída", "Saída do veículo registrada com sucesso!");
      goBack();
    } catch (error) {
      Alert.alert("Error", "Não foi possivel registrar o veiculo.");
      setIsRegistering(false);
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

            <Button
              title="Registrar Saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
