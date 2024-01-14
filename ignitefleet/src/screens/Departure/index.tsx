import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { Container, Content, Message } from "./styles";
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

/* solicitar a permissao de localização em primeiro plano,ja que obter a permissao e ja mostrar para o usuario */
import {
  LocationAccuracy,
  useForegroundPermissions,
  watchPositionAsync,
  LocationSubscription,
} from "expo-location";

import { useUser } from "@realm/react";
import { useNavigation } from "@react-navigation/native";
import { getAdressLocation } from "../../utils/getAdressLocation";
import { Loading } from "../../components/Loading";
import { LocationInfo } from "../../components/LocationInfo";
import { Car } from "phosphor-react-native";

export function Departure() {
  const [description, setDescription] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  /* com isso tem acesso ao bancode dados local */
  const realm = useRealm();
  const user = useUser();

  const { goBack } = useNavigation();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlatenRef = useRef<TextInput>(null);

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();

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

  useEffect(() => {
    /* ativa a permissao quando entra na tela, o telefone precisa ter configurações que deixe pedir a location */
    requestLocationForegroundPermission();
  }, []);

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return;
    }
    let subscription: LocationSubscription;

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      (location) => {
        getAdressLocation(location.coords)
          .then((address) => {
            if (address) {
              setCurrentAddress(address);
            }
          })
          .finally(() => setIsLoadingLocation(false));
      }
    ).then((response) => (subscription = response));

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [locationForegroundPermission]);

  if (!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title="Saída" />
        <Message>
          Você precisa permitir as localizações em seu aplicativo, acesse as
          configurações para conceder as permissões.
        </Message>
      </Container>
    );
  }

  if (isLoadingLocation) {
    return <Loading />;
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
            {currentAddress && (
              <LocationInfo
                icon={Car}
                label="Localização atual"
                description={currentAddress}
              />
            )}

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
