import {
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";

import {
  useState,
} from "react";

import {
  useLocalSearchParams,
} from "expo-router";

export default function BookingScreen() {

  const { stationId } =
    useLocalSearchParams();

  const [
    fuelType,
    setFuelType,
  ] = useState("PETROL");

  const [
    quantity,
    setQuantity,
  ] = useState("");

  const handleBooking =
    () => {

      console.log({
        stationId,
        fuelType,
        quantity,
      });

      // API call later
  };

  return (
    <View
      className="
        flex-1
        bg-background
        px-6
        pt-20
      "
    >

      <Text
        className="
          text-3xl
          font-bold
          text-primary
        "
      >
        Fuel Booking
      </Text>

      <Text
        className="
          mt-2
          text-gray-500
        "
      >
        Station ID:
        {stationId}
      </Text>

      {/* Fuel Type */}

      <Text
        className="
          mt-10
          mb-3
          text-lg
          font-semibold
        "
      >
        Fuel Type
      </Text>

      <View
        className="
          flex-row
          gap-3
        "
      >

        <Pressable
          onPress={() =>
            setFuelType(
              "PETROL"
            )
          }

          className={`
            flex-1
            rounded-2xl
            p-4

            ${
              fuelType ===
              "PETROL"

                ? "bg-primary"

                : "bg-gray-200"
            }
          `}
        >

          <Text
            className={`
              text-center
              font-bold

              ${
                fuelType ===
                "PETROL"

                  ? "text-white"

                  : "text-black"
              }
            `}
          >
            Petrol
          </Text>

        </Pressable>

        <Pressable
          onPress={() =>
            setFuelType(
              "DIESEL"
            )
          }

          className={`
            flex-1
            rounded-2xl
            p-4

            ${
              fuelType ===
              "DIESEL"

                ? "bg-primary"

                : "bg-gray-200"
            }
          `}
        >

          <Text
            className={`
              text-center
              font-bold

              ${
                fuelType ===
                "DIESEL"

                  ? "text-white"

                  : "text-black"
              }
            `}
          >
            Diesel
          </Text>

        </Pressable>

      </View>

      {/* Quantity */}

      <Text
        className="
          mt-8
          mb-3
          text-lg
          font-semibold
        "
      >
        Quantity
      </Text>

      <TextInput
        placeholder="Enter liters"

        value={quantity}

        onChangeText={
          setQuantity
        }

        keyboardType="numeric"

        className="
          h-14
          rounded-2xl
          border
          border-gray-300
          bg-white
          px-4
        "
      />

      {/* Submit */}

      <Pressable
        onPress={handleBooking}

        className="
          mt-10
          h-14
          items-center
          justify-center
          rounded-2xl
          bg-primary
        "
      >

        <Text
          className="
            text-lg
            font-bold
            text-white
          "
        >
          Confirm Booking
        </Text>

      </Pressable>

    </View>
  );
}