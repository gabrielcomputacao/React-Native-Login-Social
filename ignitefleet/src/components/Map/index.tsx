import MapView, {
  LatLng,
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from "react-native-maps";
import { IconBox } from "../IconBox";
import { Car, FlagCheckered } from "phosphor-react-native";
import { useRef } from "react";
import theme from "../../theme";

type Props = MapViewProps & {
  coordinates: LatLng[];
};

export function Map({ coordinates, ...rest }: Props) {
  const lastCoordinates = coordinates[coordinates.length - 1];
  const mapRef = useRef<MapView>(null);

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      /* função para dois pontos marcados na tela se ajustarem dentro da tela */
      mapRef.current?.fitToSuppliedMarkers(["departure", "arrival"], {
        edgePadding: { top: 50, left: 50, right: 50, bottom: 50 },
      });
    }
  }

  return (
    <MapView
      ref={mapRef}
      /* utiliza o provider do google, para utilizar precisa pegar a chave da api de maps no google cloud plataform*/
      provider={PROVIDER_GOOGLE}
      style={{ width: "100%", height: 200 }}
      region={{
        longitude: lastCoordinates.longitude,
        latitude: lastCoordinates.latitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={onMapLoaded}
      {...rest}
    >
      {/* adiciona o marcador dentro do mapa */}
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox icon={Car} size="SMALL" />
      </Marker>

      {coordinates.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinates}>
            <IconBox icon={FlagCheckered} size="SMALL" />
          </Marker>

          <Polyline
            coordinates={[...coordinates]}
            strokeColor={theme.COLORS.GRAY_700}
            strokeWidth={6}
          />
        </>
      )}
    </MapView>
  );
}
