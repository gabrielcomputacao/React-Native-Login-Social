import { useRoute } from "@react-navigation/native";
import {
  Container,
  Content,
  Description,
  Label,
  LicensePlate,
  Footer,
} from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

type RouteParamsProps = {
  id: string;
};

export function Arrival() {
  const route = useRoute();

  const { id } = route.params as RouteParamsProps;

  return (
    <Container>
      <Header title="Chegada" />
      <Content>
        <Label>Placa do Veículo</Label>
        <LicensePlate>XXX0000</LicensePlate>

        <Label>Finalidade</Label>

        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quaerat
          repellendus maiores ut voluptates. Dicta, dolor quos! Recusandae
          consectetur minima sequi ratione eveniet reiciendis quasi debitis
          dolores, odio mollitia sint?
        </Description>

        <Footer>
          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </Container>
  );
}
