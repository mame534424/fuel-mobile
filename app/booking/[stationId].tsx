import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native";

import {
  useState,
} from "react";

import {
  router,
} from "expo-router";

import {
  useAuthStore,
} from "@/features/auth/stores/auth.stores";

import {
  useStationStore,
} from "@/features/maps/stores/station.stores";

import {
  createBooking,
} from "@/features/booking/services/booking.service";

import { useLocalSearchParams } from "expo-router";

export default function BookingScreen() {

  const [loading, setLoading] =
    useState(false);

  const [plateNumber, setPlateNumber] =
    useState("");

  const [fuelTypeId, setFuelTypeId] =
    useState("");

  const { user } =
    useAuthStore();
  
  const params = useLocalSearchParams();


  const {
    stationDetails,
    clearStationDetails,
  } = useStationStore();

  const fuelTypes = stationDetails?.fuels
  const stationId = params.stationId as string;
  if (!stationDetails || stationDetails.stationId !== stationId) {
  
    router.replace("/");}


  const handleBooking =
    async () => {

      if (!stationDetails) {
        return;
      }

      if (!fuelTypeId) {

        console.log(
          "Select fuel type"
        );

        return;
      }

      if (!plateNumber) {

        console.log(
          "Enter plate number"
        );

        return;
      }

      try {

        setLoading(true);

        const payload = {

          stationId:
            stationDetails.stationId,

          fuelTypeId,

          plateNumber,

          userId:
            user?.id,
        };

        console.log(payload);

        const response =
          await createBooking(
            payload
          );

        clearStationDetails();

        router.replace(
          "/status"
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
  };

  return (

    <View
      className="
        flex-1
        bg-white
        px-6
        pt-20
      "
    >

      {/* TITLE */}

      <Text
        className="
          text-3xl
          font-bold
        "
      >
        Station Booking
      </Text>

      {/* STATION NAME */}

      <Text
        className="
          mt-3
          text-lg
          text-gray-600
        "
      >
        Station:
        {" "}
        {
          stationDetails
            ?.stationName
        }
      </Text>

      {/* FUEL TYPE */}

      <Text
        className="
          mt-10
          mb-3
          text-lg
          font-semibold
        "
      >
        Select Fuel Type
      </Text>

      <View
        className="
          flex-row
          gap-3
        "
      >

        {fuelTypes.map(
          (fuel) => (

          <Pressable
            key={fuel.id}

            onPress={() =>
              setFuelTypeId(
                fuel.id
              )
            }

            className={`
              rounded-2xl
              border
              px-5
              py-4

              ${
                fuelTypeId === fuel.id
                  ? "bg-primary border-primary"
                  : "border-gray-300"
              }
            `}
          >

            <Text
              className={`
                ${
                  fuelTypeId === fuel.id
                    ? "text-white"
                    : "text-black"
                }
              `}
            >
              {fuel.name}
            </Text>

          </Pressable>

        ))}
      </View>

      {/* PLATE NUMBER */}

      <Text
        className="
          mt-10
          mb-3
          text-lg
          font-semibold
        "
      >
        Plate Number
      </Text>

      <TextInput
        value={plateNumber}

        onChangeText={
          setPlateNumber
        }

        placeholder="AA-12345"

        className="
          h-14
          rounded-2xl
          border
          border-gray-300
          px-4
          text-base
        "
      />

      {/* BUTTON */}

      <Pressable
        onPress={
          handleBooking
        }

        className="
          mt-10
          h-14
          items-center
          justify-center
          rounded-2xl
          bg-primary
        "
      >

        {loading ? (

          <ActivityIndicator
            color="white"
          />

        ) : (

          <Text
            className="
              text-lg
              font-bold
              text-white
            "
          >
            Confirm Booking
          </Text>

        )}

      </Pressable>

    </View>
  );
}