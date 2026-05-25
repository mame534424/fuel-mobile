import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Platform,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import {
  router,
  useLocalSearchParams,
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

import AnimatedScreen from "@/components/ui/AnimatedScreen";
import AppHeader from "@/components/ui/AppHeader";
import PrimaryActionButton from "@/components/ui/PrimaryActionButton";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {KeyboardAwareScrollView} from "react-native-keyboard-controller";

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

  const selectedFuelLabel =
    stationDetails?.fuels.find(
      (fuel) => fuel.fuelTypeId === selectedFuel
    )?.fuelTypeName;

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

        const response = await createBooking(
          payload
        );

        // clearStationDetails();

        router.push({
          pathname: "/booking/confirmation",
          params: {
            stationName: stationDetails.stationName,
            bookingNumber:
              response?.booking?.bookingNumber ??
              response?.bookingNumber ??
              "",
            queueNumber: String(
              response?.booking?.queueNumber ??
              response?.queueNumber ??
              stationDetails.bookings?.[0]?.count ??
              "0"
            ),
            plateNumber: data.plateNumber,
            fuelType: selectedFuelLabel ?? "",
            status:
              response?.booking?.status ??
              response?.status ??
              "PENDING",
          },
        });

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

}, [stationDetails, stationId]);

  if (!stationDetails || stationDetails.stationId !== stationId) {
    return (
      <View className="flex-1 items-center justify-center bg-[#f4fbf7]">
        <ActivityIndicator color="#0f7a47" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f4fbf7]" edges={["top", "left", "right", "bottom"]}>
      <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={
    Platform.OS === "ios"
      ? "padding"
      : "height"
  }
>
  <ScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      flexGrow: 1,
      paddingBottom: 40,
    }}
  >
          <View className="px-5 pt-4">
          <AppHeader
            title="Station booking"
            subtitle={stationDetails.stationName}
            onBack={() => router.back()}
          />

          <AnimatedScreen>
            <View className="rounded-[32px] bg-emerald-950 p-5">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-4">
                  <Text className="text-xs uppercase tracking-[0.22em] text-emerald-200">
                    Booking summary
                  </Text>
                  <Text className="mt-2 text-2xl font-black text-white">
                    Reserve fuel in seconds
                  </Text>
                  <Text className="mt-2 text-sm leading-5 text-emerald-100">
                    Choose your fuel type and plate number to lock your place in the queue.
                  </Text>
                </View>
                <View className="h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
                  <Ionicons name="card" size={28} color="#d1fae5" />
                </View>
              </View>

              <View className="mt-4 flex-row gap-3">
                <View className="flex-1 rounded-2xl bg-white/10 p-4">
                  <Text className="text-xs uppercase tracking-[0.18em] text-emerald-200">
                    Queue
                  </Text>
                  <Text className="mt-2 text-2xl font-black text-white">
                    {stationDetails.bookings?.[0]?.count ?? "0"}
                  </Text>
                </View>
                <View className="flex-1 rounded-2xl bg-white/10 p-4">
                  <Text className="text-xs uppercase tracking-[0.18em] text-emerald-200">
                    Fuel options
                  </Text>
                  <Text className="mt-2 text-2xl font-black text-white">
                    {stationDetails.fuels.length}
                  </Text>
                </View>
              </View>
            </View>
          </AnimatedScreen>

          <AnimatedScreen delay={80}>
            <Text className="mb-3 mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Select fuel type
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {stationDetails.fuels.map((fuel) => (
                <Pressable
                  key={fuel.fuelTypeId}
                  onPress={() =>
                    setValue(
                      "fuelTypeId",
                      fuel.fuelTypeId
                    )
                  }
                  className={`min-w-[44%] flex-1 rounded-3xl border px-4 py-4 ${
                    selectedFuel === fuel.fuelTypeId
                      ? "border-emerald-700 bg-emerald-700"
                      : "border-emerald-100 bg-white/95"
                  }`}
                >
                  <Text
                    className={`text-base font-bold ${
                      selectedFuel === fuel.fuelTypeId ? "text-white" : "text-emerald-950"
                    }`}
                  >
                    {fuel.fuelTypeName}
                  </Text>
                  <Text className={`mt-2 text-sm ${selectedFuel === fuel.fuelTypeId ? "text-emerald-100" : "text-emerald-700"}`}>
                    {fuel.quantity} L available
                  </Text>
                </Pressable>
              ))}
            </View>

            {errors.fuelTypeId ? (
              <Text className="mt-2 text-sm text-red-600">{errors.fuelTypeId.message}</Text>
            ) : null}
          </AnimatedScreen>

          <AnimatedScreen delay={140}>
            <View className="mt-6">
              <Controller
                control={control}
                name="plateNumber"
                render={({ field: { onChange, value } }) => (
                  <TextInputField
                    label="Plate number"
                    value={value}
                    onChange={onChange}
                    placeholder="Enter your vehicle plate"
                    autoCapitalize="characters"
                    textContentType="none"
                    error={errors.plateNumber?.message}
                  />
                )}
              />
            </View>
          </AnimatedScreen>

          <AnimatedScreen delay={200}>
            <View className="mt-3">
              <PrimaryActionButton
                title="Confirm booking"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                disabled={!selectedFuel}
              />
            </View>
          </AnimatedScreen>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>


    </SafeAreaView>
  );
}