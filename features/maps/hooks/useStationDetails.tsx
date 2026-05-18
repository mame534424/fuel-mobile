import { useEffect, useState }
from "react";

import {
 getStationStatus,
} from "../services/station.service";

import { Station }
from "../types/station.types";

export function useStationDetails(
  stationId?: string
) {

  const [stationDetails,
  setStationDetails] =
    useState<Station | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (!stationId) return;

    (async () => {

      try {

        setLoading(true);

        const data =
          await getStationStatus(
            stationId
          );

        setStationDetails(data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    })();

  }, [stationId]);

  return {
    stationDetails,
    loading,
  };
}