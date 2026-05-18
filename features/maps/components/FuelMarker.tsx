import { Marker } from "react-native-maps";
import { Image } from "react-native";


import { Station }
from "../types/station.types";

interface Props {
  station: Station;
}

export default function FuelMarker({
  station,
}: Props) {

  let pinColor = "green";

  if (station.status === "LOW_FUEL") {
    pinColor = "red";
  }


  return (
    <Marker
      coordinate={{
        latitude: station.latitude,
        longitude: station.longitude,
      }}
      title={station.name}
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