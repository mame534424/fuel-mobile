import "../../global.css"

import { View, Text, Pressable,ActivityIndicator }
from "react-native";

import { useThemeStore }
from "@/stores/themeStore";

import MapView
from "react-native-maps";

import { useUserLocation }
from "@/features/maps/hooks/useUserLocation";

import { useNearbyStations }
from "@/features/maps/hooks/useStationLocation";

import FuelMarker
from "@/features/maps/components/FuelMarker";

export default function MapScreen() {

  const {theme,toggleTheme} = useThemeStore();

  const {location,loading} = useUserLocation();

  const {
    stations,
  } = useNearbyStations(
    location?.latitude,
    location?.longitude
  );

  if (loading || !location) {
    return (
      <View
        className="
          flex-1
          items-center
          justify-center
        "
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}

      showsUserLocation

      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,

        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {stations.map((station) => (
        <FuelMarker
          key={station.id}
          station={station}
        />
      ))}
    </MapView>
  );
}