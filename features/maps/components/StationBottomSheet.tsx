import BottomSheet
from "@gorhom/bottom-sheet";

import {
  View,
  Text,
  Pressable,
} from "react-native";

import { useMemo }
from "react";

import { Station, StationNearby }
from "../types/station.types";

import StationFuelCard
from "./StationFuelCard";

import StationQueueCard
from "./StationQueueCard";

interface Props {

  station: Station | null;

  bottomSheetRef: any;

  onBook: () => void;
}

export default function StationBottomSheet({
  station,
  bottomSheetRef,
  onBook,
}: Props) {



  const snapPoints =
    useMemo(
      () => ["25%", "50%"],
      []
    );
    console.log("i am selected");

  if (!station) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: "red",
        }}
    >
      <View className="flex-1 p-5">

        <Text
          className="
            text-2xl
            font-bold
          "
        >
          {station.stationName}
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
            queueCount={station.bookings[0].count}
          />

          {station.fuels.map(
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
    </BottomSheet>
  );
}