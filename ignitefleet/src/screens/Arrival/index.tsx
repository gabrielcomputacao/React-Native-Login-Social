import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Container,
  Content,
  Description,
  Label,
  LicensePlate,
  Footer,
  AsyncMessage,
} from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { X } from "phosphor-react-native";
import { useObject, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { BSON } from "realm";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { getLastAsyncTimestamp } from "../../libs/asyncStorage/syncStorage";
import { stopLocationTask } from "../../tasks/backgroundLocationTask";

type RouteParamsProps = {
  id: string;
};

export function Arrival() {
  const route = useRoute();

  const { id } = route.params as RouteParamsProps;

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string);
  const realm = useRealm();
  const { goBack } = useNavigation();

  const [dataNotSynced, setDataNotSynceed] = useState(false);

  const title = historic?.status === "departure" ? "Chegada" : "Detales";

  function removeVehicleUsage() {
    /* deleta o objeto que foi usado pelo useObject, o realm e baseado em Orientação a objeto
      o useObject pegou o dado do banco 
      e agora como tem esse registro e possivel deletar exatamente esse dado
    */
    realm.write(() => {
      realm.delete(historic);
    });

    goBack();
  }

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert("Error", "nao foi possivel obter os dados do carro");
      }

      await stopLocationTask();

      realm.write(() => {
        historic.status = "arrival";
        historic.updated_at = new Date();
      });

      Alert.alert("Chegada", "Chegada registrada com sucesso.");
      goBack();
    } catch (error) {
      Alert.alert("Error", "nao foi possivel selecionar");
    }
  }

  function handleRemoveVehicleUsage() {
    Alert.alert("Cancelar", "Cancelar a utilização do veículo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeVehicleUsage() },
    ]);
  }

  useEffect(() => {
    getLastAsyncTimestamp().then((lastSync) =>
      setDataNotSynceed(historic!.updated_at.getTime() > lastSync)
    );
  }, []);

  return (
    <Container>
      <Header title={title} />
      <Content>
        <Label>Placa do Veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>

        <Description>{historic?.description}</Description>
      </Content>
      {historic?.status === "departure" && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar Chegada" onPress={handleArrivalRegister} />
        </Footer>
      )}

      {dataNotSynced && (
        <AsyncMessage>
          Sincronização da
          {historic?.status === "departure" ? "partida" : "chegada"} pendente.
        </AsyncMessage>
      )}
    </Container>
  );
}
