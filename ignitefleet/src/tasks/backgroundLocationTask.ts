import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";
import * as TaskManager from "expo-task-manager";
import {
  removeStorageLocations,
  saveStorageLocation,
} from "../libs/asyncStorage/locationStorage";

export const BACKGROUND_TASK_NAME = "Location-tracking";

TaskManager.defineTask(BACKGROUND_TASK_NAME, async ({ data, error }: any) => {
  try {
    if (error) {
      throw error;
    }

    if (data) {
      const { coords, timestamp } = data.locations[0];

      const currentLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        /* momento que a coordenada foi registrada */
        timestamp: timestamp,
      };

      await saveStorageLocation(currentLocation);
    }
  } catch (error) {
    console.log(error);
    stopLocationTask();
  }
});

/* metodo que fica observando se tem alteração na localização */

export async function startLocationTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK_NAME
    );

    if (hasStarted) {
      await stopLocationTask();
    }

    /* fica pegando a coordenada no intervalo definido, posição atulaizada do usuario */
    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function stopLocationTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(
      BACKGROUND_TASK_NAME
    );

    if (hasStarted) {
      await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME);
      /*  limpa o async storage */
      await removeStorageLocations();
    }
  } catch (error) {}
}
