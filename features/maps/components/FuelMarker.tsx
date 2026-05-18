import { Marker }
from "react-native-maps";

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
      pinColor={pinColor}
    />
  );
}