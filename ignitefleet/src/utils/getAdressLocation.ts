import { reverseGeocodeAsync } from "expo-location";

type Props = {
  latitude: number;
  longitude: number;
};

export async function getAdressLocation({ latitude, longitude }: Props) {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude });

    /* retorno do endereço  */
    return addressResponse[0]?.street;
  } catch (error) {
    console.log(error);
  }
}
