import { useNavigation } from "@react-navigation/native";
import { CarStatus } from "../../components/CarsStatus";
import { HomeHeader } from "../../components/HomeHeader";
import { Container, Content } from "./styles";
import { useQuery } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const { navigate } = useNavigation();
  /* passando o useQuery e o schema ele ja traz todos os dados que estao no banco de dados local */
  const historic = useQuery(Historic);

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

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          onPress={handleRegisterMoviment}
          licensePlate={vehicleInUse?.license_plate}
        />
      </Content>
    </Container>
  );
}
