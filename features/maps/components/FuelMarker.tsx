import { Marker } from "react-native-maps";
import { Image } from "react-native";


import { StationNearby }
from "../types/station.types";

interface Props {
  station: StationNearby
  onPress: () => void;
}

export default function FuelMarker({
  station,
  onPress
}: Props) {

  let pinColor = "green";

  

  return (
    <Marker
      coordinate={{
        latitude: station.latitude,
        longitude: station.longitude,
      }}
      title={station.name}
      onPress={onPress}
    >
      <Image
        source={require(
          "../../../assets/images/fuel_marker.png"
        )}
        style={{
          width: 42,
          height: 42,
        }}
        resizeMode="contain"
      />
    </Marker>
  );
}