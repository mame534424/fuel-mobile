import "../../global.css";
import { View, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import { useUserLocation } from "@/features/maps/hooks/useUserLocation";
import { useNearbyStations } from "@/features/maps/hooks/useStationLocation";
import FuelMarker from "@/features/maps/components/FuelMarker";
import { useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler"; 
import StationBottomSheet from "@/features/maps/components/StationBottomSheet";
import { Station, StationNearby } from "@/features/maps/types/station.types";

import { useStationDetails } from "@/features/maps/hooks/useStationDetails";

export default function MapScreen() {
  const { location, loading } = useUserLocation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedStation, setSelectedStation] = useState<StationNearby | null>(null);
  

  const { stations } = useNearbyStations(
    location?.latitude,
    location?.longitude
  );
  const {stationDetails,} = useStationDetails(selectedStation?.id);

  const handleMarkerPress = async (station: StationNearby) => {
    setSelectedStation(station);
    };
    
  useEffect(() => {
    if (selectedStation) {
      // Index 0 requires snapPoints to be defined on the BottomSheet wrapper
      bottomSheetRef.current?.snapToIndex(0); 
    } else {
      bottomSheetRef.current?.close();
    }
  }, [selectedStation]);

  if (loading || !location) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    // Wrap the top-level container with GestureHandlerRootView
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1">
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
              onPress={() => handleMarkerPress(station)}
            />
          ))}
        </MapView>
        
        {/* Pass ref down directly */}
        <StationBottomSheet bottomSheetRef={bottomSheetRef} station={stationDetails} onBook={() => console.log("Booking fuel...")} />
      </View>
    </GestureHandlerRootView>
  );
}
