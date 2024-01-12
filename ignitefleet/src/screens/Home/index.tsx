import { useNavigation } from "@react-navigation/native";
import { CarStatus } from "../../components/CarsStatus";
import { HomeHeader } from "../../components/HomeHeader";
import { Container, Content } from "./styles";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { HistoricCard } from "../../components/HistoricCard";

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

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
    const response = historic.filtered(
      "status = 'arrival' SORT(created_at DESC)"
    );
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
    return () => realm.removeListener("change", fetchVehicle);
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          onPress={handleRegisterMoviment}
          licensePlate={vehicleInUse?.license_plate}
        />

        <HistoricCard
          data={{ created: "20/04", licensePlate: "XXX2323", isSync: false }}
        />
      </Content>
    </Container>
  );
}
