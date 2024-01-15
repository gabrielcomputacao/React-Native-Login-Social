import { Container, Line } from "./styles";
import { LocationInfoProps, LocationInfo } from "../LocationInfo";
import { Car, FlagCheckered } from "phosphor-react-native";

type Props = {
  departure: LocationInfoProps;
  arrival?: LocationInfoProps | null;
};

export function Locations({ arrival = null, departure }: Props) {
  return (
    <Container>
      <LocationInfo
        icon={Car}
        label={departure.label}
        description={departure.description}
      />

      {arrival && (
        <>
          <Line />

          <LocationInfo
            icon={FlagCheckered}
            label={arrival.label}
            description={arrival.description}
          />
        </>
      )}
    </Container>
  );
}
