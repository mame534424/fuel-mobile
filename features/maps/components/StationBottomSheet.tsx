import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Pressable, Text, View } from "react-native";
import { useMemo, RefObject } from "react";
import { Station } from "../types/station.types";
import StationQueueCard from "./StationQueueCard";
import StationFuelCard from "./StationFuelCard";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  bottomSheetRef: RefObject<BottomSheet | null>;
  station: Station | null;
  onBook: () => void;
}

export default function StationBottomSheet({ bottomSheetRef, station, onBook }: Props) {
  const snapPoints = useMemo(() => ["36%", "72%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#f8fffb" }}
      handleIndicatorStyle={{ backgroundColor: "#b5cdb9" }}
    >
      <BottomSheetView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 6,
          paddingBottom: 20,
        }}
      >
        <View className="flex-1">
          <View className="rounded-[28px] bg-emerald-950 p-5">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="text-sm uppercase tracking-[0.18em] text-emerald-200">
                  Station details
                </Text>
                <Text className="mt-2 text-2xl font-black text-white">
                  {station?.stationName ?? "Select a station"}
                </Text>
              </View>

              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Ionicons name="water" size={22} color="#d1fae5" />
              </View>
            </View>

            <Text className="mt-3 text-sm leading-5 text-emerald-100">
              Review the live queue and fuel availability, then continue to the booking form.
            </Text>

            <View className="mt-4">
              <StationQueueCard queueCount={station?.bookings?.[0]?.count ?? "0"} />
            </View>
          </View>

          <Text className="mt-5 mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Fuel availability
          </Text>

          <View className="flex-1">
            {station?.fuels.map((fuel) => (
              <StationFuelCard
                key={fuel.fuelTypeId}
                type={fuel.fuelTypeName}
                availableFuel={fuel.quantity}
              />
            ))}
          </View>

          <Pressable
            onPress={onBook}
            className="mt-2 items-center rounded-2xl bg-emerald-700 px-5 py-4 shadow-sm"
          >
            <Text className="text-base font-bold text-white">Book this station</Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
