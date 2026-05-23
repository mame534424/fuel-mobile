import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";

import {
  router,
} from "expo-router";

import {
  useState,useEffect,
} from "react";

import {
  useForm,
  Controller,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  bookingSchema,
} from "@/features/booking/validation/booking.schema";

import TextInputField
from "@/components/ui/TextInputField";

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

  const { user } =
    useAuthStore();

  const {
    stationDetails,
    clearStationDetails,
  } = useStationStore();

  const params = useLocalSearchParams();
  const stationId = params.stationId as string;
  


  const {
    control,
    handleSubmit,
    setValue,

    formState: {
      errors,
    },

    watch,

  } = useForm({

    resolver:
      zodResolver(
        bookingSchema
      ),

    defaultValues: {

      plateNumber: "",

      fuelTypeId:
        undefined,
    },
  });

  const selectedFuel =
    watch("fuelTypeId");

  const onSubmit =
    async (data:any) => {

      if (!stationDetails) {
        return;
      }

      try {

        setLoading(true);

        const payload = {

          stationId:
            stationDetails
              .stationId,

          fuelTypeId:
            data.fuelTypeId,

          plateNumber:
            data.plateNumber,

          userId:
            user?.id,
        };

        console.log(payload);

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
  
  useEffect(() => {

  if (!stationDetails || stationDetails.stationId !== stationId) {
  
    router.replace("/");
  }

}, [stationDetails]);// these should redirect into stats 

  return (

    <View
      className="
        flex-1
        bg-background
        px-6
        pt-20
      "
    >

      {/* HEADER */}

      <Text
        className="
          text-3xl
          font-bold
          text-primary
        "
      >
        Station Booking
      </Text>

      <Text
        className="
          mt-3
          text-lg
          text-gray-500
        "
      >
        {
          stationDetails
            ?.stationName
        }
      </Text>

      {/* FUEL TYPES */}

      <Text
        className="
          mt-10
          mb-4
          text-lg
          font-semibold
        "
      >
        Select Fuel Type
      </Text>

      <View
        className="
          flex-row
          flex-wrap
          gap-3
        "
      >

        {stationDetails?.fuels.map(
          (fuel) => (

          <Pressable

            key={
              fuel.fuelTypeId
            }

            onPress={() =>
              setValue(
                "fuelTypeId",
                fuel.fuelTypeId
              )
            }

            className={`
              rounded-2xl
              border
              px-5
              py-4

              ${
                selectedFuel ===
                fuel.fuelTypeId

                ? "border-primary bg-primary"

                : "border-gray-300 bg-white"
              }
            `}
          >

            <Text
              className={`
                font-semibold

                ${
                  selectedFuel ===
                  fuel.fuelTypeId

                  ? "text-white"

                  : "text-black"
                }
              `}
            >
              {
                fuel.fuelTypeName
              }
            </Text>

          </Pressable>

        ))}
      </View>

      {/* FUEL ERROR */}

      {errors.fuelTypeId && (

        <Text
          className="
            mt-2
            text-red-500
          "
        >
          {
            errors
              .fuelTypeId
              .message
          }
        </Text>

      )}

      {/* PLATE NUMBER */}

      <View
        className="mt-8"
      >

        <Controller
          control={control}

          name="plateNumber"

          render={({

            field: {
              onChange,
              value,
            },

          }) => (

            <TextInputField

              label="Plate Number"

              value={value}

              onChange={onChange}

              error={
                errors
                  .plateNumber
                  ?.message
              }
            />

          )}
        />

      </View>

      {/* BUTTON */}

      <Pressable

        onPress={
          handleSubmit(
            onSubmit
          )
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