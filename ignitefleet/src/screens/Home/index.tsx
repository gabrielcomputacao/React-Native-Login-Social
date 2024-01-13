import { useNavigation } from "@react-navigation/native";
import { CarStatus } from "../../components/CarsStatus";
import { HomeHeader } from "../../components/HomeHeader";
import { Container, Content, Label, Tittle } from "./styles";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { HistoricCard, HistoricCardProps } from "../../components/HistoricCard";
import dayjs from "dayjs";
import { useUser } from "@realm/react";

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHisotric] = useState<HistoricCardProps[]>(
    []
  );

  const user = useUser();

  const { navigate } = useNavigation();
  /* passando o useQuery e o schema ele ja traz todos os dados que estao no banco de dados local */
  const historic = useQuery(Historic);
  const realm = useRealm();

  function handleRegisterMoviment() {
    if (vehicleInUse?._id) {
      return navigate("arrival", { id: vehicleInUse?._id.toString() });
    } else {
      navigate("departure");
    }
  }

  function fetchVehicle() {
    try {
      /* faz um filtro dentro do banco de dados */
      const vehicle = historic.filtered(" status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert("Veículo", "Não foi possível acessar veiculo.");
    }
  }

  function fetchHistoric() {
    try {
      const response = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)"
      );

      const formattedHistoric = response.map((item) => {
        return {
          id: item._id!.toString(),
          licensePlate: item.license_plate,
          isSync: false,
          created: dayjs(item.created_at).format(
            "[Saída em] DD/MM/YYYY [ás] HH:mm"
          ),
        };
      });
      setVehicleHisotric(formattedHistoric);
    } catch (error) {
      Alert.alert("Error", "Não foi possível acessar dados.");
    }
  }

  /* carrega quando a interface e carregada */
  useEffect(() => {
    fetchVehicle();
  }, []);

  /* carrega quando a mudanças no banco */
  useEffect(() => {
    realm.addListener("change", () => fetchVehicle());

    /* quando o componente é desmontado se tratando de listener é sempre bom remove-los atraves do return do useEffect
      ele limpa quando o componente é desmontado
    */
    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener("change", fetchVehicle);
      }
    };
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  function handleHistoricDetails(id: string) {
    navigate("arrival", { id });
  }

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects("Historic")
        .filtered(`user_id = '${user!.id}'`);

      mutableSubs.add(historicByUserQuery, { name: "historic_by_user" });
    });
  }, [realm]);

  function progressNotification(transferred: number, transferable: number) {
    const parcentage = (transferred / transferable) * 100;
  }

  useEffect(() => {
    const syncSession = realm.syncSession;

    if (!syncSession) {
      return;
    }

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification
    );

    return () => syncSession.removeProgressNotification(progressNotification);
  }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          onPress={handleRegisterMoviment}
          licensePlate={vehicleInUse?.license_plate}
        />

        <Tittle>Histórico</Tittle>

        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Label>Nenhum veículo utilizado.</Label>}
        />
      </Content>
    </Container>
  );
}
