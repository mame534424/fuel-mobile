import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"; 
import { Pressable, Text, View } from "react-native";
import { useMemo, RefObject } from "react";
import { Station } from "../types/station.types";
import StationQueueCard from "./StationQueueCard";
import StationFuelCard from "./StationFuelCard";

interface Props {
  // 2. Properly type your ref instead of using 'any'
  bottomSheetRef: RefObject<BottomSheet | null>; 
  station: Station | null;
  onBook: () => void;
}

export default function StationBottomSheet({ bottomSheetRef, station, onBook }: Props) {
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true} // Allows swiping down to dismiss smoothly
    >
      {/* 3. FIX: Changed from View to BottomSheetView */}
      <BottomSheetView
        style={{
          flex: 1,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 20, // Optional: Provides safe spacing at the bottom of the screen
        }}
      >
            <View className="flex-1 p-5">

                <Text
                className="
                    text-2xl
                    font-bold
                "
                >
                {station?.stationName}
                </Text>

                <Text
                className="
                    mt-2
                    text-gray-500
                "
                >
                
                </Text>

                <View className="mt-5">

                <StationQueueCard
                    queueCount={station?.bookings[0].count}
                />

                {station?.fuels.map(
                    (fuel) => (
                    <StationFuelCard
                        key={fuel.fuelTypeId}
                        type={fuel.fuelTypeName}
                        availableFuel={
                        fuel.quantity
                        }
                    />
                    )
                )}

                </View>

                <Pressable
                onPress={onBook}
                className="
                    mt-5
                    items-center
                    rounded-2xl
                    bg-green-700
                    p-4
                "
                >
                <Text
                    className="
                    text-lg
                    font-bold
                    text-white
                    "
                >
                    Book Fuel
                </Text>
                </Pressable>

            </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
