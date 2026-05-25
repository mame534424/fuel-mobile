import { View, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AnimatedScreen from "@/components/ui/AnimatedScreen";
import AppHeader from "@/components/ui/AppHeader";

export default function BookingConfirmationScreen() {
  const params = useLocalSearchParams<{
    stationName?: string;
    bookingNumber?: string;
    queueNumber?: string;
    plateNumber?: string;
    fuelType?: string;
    status?: string;
  }>();

  const details = [
    { label: "Station", value: params.stationName ?? "Your selected station" },
    { label: "Fuel", value: params.fuelType ?? "Selected fuel" },
    { label: "Plate", value: params.plateNumber ?? "Not provided" },
    { label: "Queue", value: params.queueNumber ? `#${params.queueNumber}` : "Pending" },
  ];

  return (
    <View className="flex-1 bg-[#f4fbf7] px-5 pt-14">
      <AppHeader title="Booking confirmed" subtitle="Your place is secured" onBack={() => router.back()} />

      <AnimatedScreen className="mt-4 flex-1">
        <View className="flex-1 justify-between rounded-[36px] bg-white p-5 shadow-sm">
          <View>
            <View className="items-center">
              <View className="h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
                <Ionicons name="checkmark" size={52} color="#0f7a47" />
              </View>
              <Text className="mt-5 text-3xl font-black text-emerald-950">
                Booking confirmed!
              </Text>
              <Text className="mt-2 text-center text-sm leading-5 text-emerald-700">
                Your fuel request is queued and ready for live tracking.
              </Text>
            </View>

            <View className="mt-6 rounded-[28px] bg-emerald-950 p-4">
              <Text className="text-xs uppercase tracking-[0.2em] text-emerald-200">
                Booking reference
              </Text>
              <Text className="mt-2 text-2xl font-black text-white">
                {params.bookingNumber ? `#${params.bookingNumber}` : "Booking pending"}
              </Text>
              <Text className="mt-2 text-sm text-emerald-100">
                Status: {params.status ?? "PENDING"}
              </Text>
            </View>

            <View className="mt-5 gap-3">
              {details.map((item) => (
                <View key={item.label} className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                  <Text className="text-xs uppercase tracking-[0.18em] text-emerald-700">{item.label}</Text>
                  <Text className="mt-1 text-base font-semibold text-emerald-950">{item.value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="gap-3 pb-2">
            <Pressable
              onPress={() => router.replace("/status")}
              className="items-center rounded-2xl bg-emerald-700 py-4"
            >
              <Text className="text-base font-bold text-white">Track status</Text>
            </Pressable>

            <Pressable
              onPress={() => router.replace("/")}
              className="items-center rounded-2xl border border-emerald-200 bg-white py-4"
            >
              <Text className="text-base font-bold text-emerald-900">Done</Text>
            </Pressable>
          </View>
        </View>
      </AnimatedScreen>
    </View>
  );
}