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
import { getStorageLocations } from "../../libs/asyncStorage/locationStorage";
import { LatLng } from "react-native-maps";
import { Map } from "../../components/Map";
import { Locations } from "../../components/Locations";
import { getAdressLocation } from "../../utils/getAdressLocation";
import { LocationInfoProps } from "../../components/LocationInfo";
import dayjs from "dayjs";
import { Loading } from "../../components/Loading";

type RouteParamsProps = {
  id: string;
};

export function Arrival() {
  const route = useRoute();
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [departure, setDeparture] = useState<LocationInfoProps>(
    {} as LocationInfoProps
  );
  const [arrival, setArrival] = useState<LocationInfoProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = route.params as RouteParamsProps;

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string);
  const realm = useRealm();
  const { goBack } = useNavigation();

  const [dataNotSynced, setDataNotSynceed] = useState(false);

  const title = historic?.status === "departure" ? "Chegada" : "Detales";

  async function removeVehicleUsage() {
    /* deleta o objeto que foi usado pelo useObject, o realm e baseado em Orientação a objeto
      o useObject pegou o dado do banco 
      e agora como tem esse registro e possivel deletar exatamente esse dado
    */
    realm.write(() => {
      realm.delete(historic);
    });

    await stopLocationTask();

    goBack();
  }

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert("Error", "nao foi possivel obter os dados do carro");
      }

      const locations = await getStorageLocations();

      realm.write(() => {
        historic.status = "arrival";
        historic.updated_at = new Date();
        historic.coords.push(...locations);
      });

      await stopLocationTask();

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

  async function getLocationsInfo() {
    if (!historic) {
      return;
    }

    const lastSync = await getLastAsyncTimestamp();
    const updateAt = historic!.updated_at.getTime();

    setDataNotSynceed(updateAt > lastSync);

    if (historic?.status === "departure") {
      const locationStorage = await getStorageLocations();
      setCoordinates(locationStorage);
    } else {
      setCoordinates(historic?.coords ?? []);
    }

    if (historic?.coords[0]) {
      const departureStreetName = await getAdressLocation(historic?.coords[0]);

      setDeparture({
        label: `Saindo em ${departureStreetName ?? ""}`,
        description: dayjs(new Date(historic?.coords[0].timestamp)).format(
          "DD/MM/YYYY [ás] HH:mm"
        ),
      });
    }

    if (historic.status === "arrival") {
      const lastLocation = historic.coords[historic.coords.length - 1];
      const arrivalStreetName = await getAdressLocation(lastLocation);

      setArrival({
        label: `Chegando em ${arrivalStreetName ?? ""}`,
        description: dayjs(lastLocation.timestamp).format(
          "DD/MM/YYYY [ás] HH:mm"
        ),
      });
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getLocationsInfo();
  }, [historic]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header title={title} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

      <Content>
        <Locations departure={departure} arrival={arrival} />

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
