import MapView, {
  LatLng,
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { IconBox } from "../IconBox";
import { Car } from "phosphor-react-native";

type Props = MapViewProps & {
  coordinates: LatLng[];
};

export function Map({ coordinates, ...rest }: Props) {
  const lastCoordinates = coordinates[coordinates.length - 1];

  return (
    <MapView
      /* utiliza o provider do google, para utilizar precisa pegar a chave da api de maps no google cloud plataform*/
      provider={PROVIDER_GOOGLE}
      style={{ width: "100%", height: 200 }}
      region={{
        longitude: lastCoordinates.longitude,
        latitude: lastCoordinates.latitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {/* adiciona o marcador dentro do mapa */}
      <Marker coordinate={coordinates[0]}>
        <IconBox icon={Car} size="SMALL" />
      </Marker>
    </MapView>
  );
}
