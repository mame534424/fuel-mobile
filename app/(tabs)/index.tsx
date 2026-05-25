import "../../global.css";
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import MapView from "react-native-maps";
import { useUserLocation } from "@/features/maps/hooks/useUserLocation";
import { useNearbyStations } from "@/features/maps/hooks/useStationLocation";
import FuelMarker from "@/features/maps/components/FuelMarker";
import { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler"; 
import StationBottomSheet from "@/features/maps/components/StationBottomSheet";
import {StationNearby } from "@/features/maps/types/station.types";
import { useStationDetails } from "@/features/maps/hooks/useStationDetails";
import { router } from "expo-router";
import { useAuthStore} from "@/features/auth/stores/auth.stores";
import {useBookingStore} from "@/features/booking/stores/booking.store";
import { useStationStore } from "@/features/maps/stores/station.stores";
import AnimatedScreen from "@/components/ui/AnimatedScreen";
import { Ionicons } from "@expo/vector-icons";

export default function MapScreen() {
  const { location, loading } = useUserLocation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedStation, setSelectedStation] = useState<StationNearby | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const user =
  useAuthStore(
    (state) => state.user
  );

const setPendingStation =
  useBookingStore(
    (state) =>
      state.setPendingStation
  );
const setStationDetails =
  useStationStore(
    (state) =>
      state.setStationDetails
  );

  const { stations } = useNearbyStations(
    location?.latitude,
    location?.longitude
  );
  const {stationDetails,} = useStationDetails(selectedStation?.id);

  const filteredStations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return stations;
    }

    return stations.filter((station) => {
      return (
        station.name.toLowerCase().includes(query) ||
        station.code.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, stations]);

  const handleMarkerPress = async (station: StationNearby) => {
    setSelectedStation(station);
    };

  const handleBooking = () => {

      if (!stationDetails?.stationId) {
        return;
      }
      setStationDetails(stationDetails);

      if (!user) {

    setPendingStation(
      stationDetails?.stationId
    );

    router.push(
      "/auth/login"
    );

    return;
  }

  router.push(
    `/booking/${stationDetails?.stationId}`// by using uselocalparams in booking screen we can access 
  );
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
      <View className="flex-1 items-center justify-center bg-[#f4fbf7] px-6">
        <AnimatedScreen className="w-full max-w-md rounded-[32px] border border-emerald-100 bg-white p-6 shadow-sm">
          <View className="items-center">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <ActivityIndicator color="#0f7a47" />
            </View>
            <Text className="mt-4 text-2xl font-black text-emerald-950">
              Locating nearby stations
            </Text>
            <Text className="mt-2 text-center text-sm leading-5 text-emerald-700">
              We are finding stations near you so the map can load the closest fuel options.
            </Text>
          </View>
        </AnimatedScreen>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-[#f4fbf7]">
        <MapView
          style={{ flex: 1 }}
          showsUserLocation
          showsMyLocationButton
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {filteredStations.map((station) => (
            <FuelMarker
              key={station.id}
              station={station}
              onPress={() => handleMarkerPress(station)}
            />
          ))}
        </MapView>

        <View className="absolute left-0 right-0 top-0 px-4 pt-12">
          <AnimatedScreen>
            <View className="rounded-[30px] border border-white/70 bg-white/90 p-4 shadow-sm">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-xs uppercase tracking-[0.22em] text-emerald-700">
                    Nearby stations
                  </Text>
                  <Text className="mt-1 text-2xl font-black text-emerald-950">
                    Find fuel fast
                  </Text>
                </View>
                <View className="h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                  <Ionicons name="navigate" size={20} color="#0f7a47" />
                </View>
              </View>

              <View className="mt-4 flex-row items-center rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                <Ionicons name="search" size={18} color="#0f7a47" />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search station name or code"
                  placeholderTextColor="#7b9480"
                  className="ml-3 flex-1 text-base text-emerald-950"
                />
                {searchQuery ? (
                  <Pressable onPress={() => setSearchQuery("") }>
                    <Ionicons name="close-circle" size={20} color="#7b9480" />
                  </Pressable>
                ) : null}
              </View>

              <View className="mt-4 flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-emerald-700">
                  {filteredStations.length} stations nearby
                </Text>
                <Text className="text-sm text-emerald-600">
                  Tap a marker to view details
                </Text>
              </View>
            </View>
          </AnimatedScreen>
        </View>

        {searchQuery && filteredStations.length === 0 ? (
          <View className="absolute left-0 right-0 top-40 px-4">
            <AnimatedScreen delay={80}>
              <View className="rounded-[28px] border border-emerald-100 bg-white/95 p-5 shadow-sm">
                <Text className="text-lg font-bold text-emerald-950">
                  No stations matched your search
                </Text>
                <Text className="mt-1 text-sm text-emerald-700">
                  Search only checks the stations returned from the nearby stations endpoint.
                </Text>
                <Pressable onPress={() => setSearchQuery("")} className="mt-4 items-center rounded-2xl bg-emerald-700 py-3">
                  <Text className="font-semibold text-white">Clear search</Text>
                </Pressable>
              </View>
            </AnimatedScreen>
          </View>
        ) : null}

        <StationBottomSheet
          bottomSheetRef={bottomSheetRef}
          station={stationDetails}
          onBook={() => handleBooking()}
        />
      </View>
    </GestureHandlerRootView>
  );
}
