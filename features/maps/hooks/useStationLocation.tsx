import { useEffect, useState }
from "react";

import { Station }
from "../types/station.types";

import {
  getNearbyStations,
} from "../services/station.service";

export function useNearbyStations(
  latitude?: number,
  longitude?: number
) {

  const [stations, setStations] =
    useState<Station[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!latitude || !longitude) return;

    (async () => {

      try {

        const data =
          await getNearbyStations(
            latitude,
            longitude
          );

        setStations(data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    })();

  }, [latitude, longitude]);

  return {
    stations,
    loading,
  };
}