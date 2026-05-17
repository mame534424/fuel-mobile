import { useEffect, useState }
from "react";

import * as Location
from "expo-location";

export function useUserLocation() {

  const [location, setLocation] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    (async () => {

      const { status } =
        await Location
          .requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLoading(false);
        return;
      }

      const currentLocation =
        await Location
          .getCurrentPositionAsync({});

      setLocation(
        currentLocation.coords
      );

      setLoading(false);

    })();

  }, []);

  return {
    location,
    loading,
  };
}