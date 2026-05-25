import { View, Text } from "react-native";

import { useCallback, useEffect, useState } from "react";

import { socket } from "@/services/socket";

import { getActiveBooking } from "@/features/status/services/status.services";
import AnimatedScreen from "@/components/ui/AnimatedScreen";
import AppHeader from "@/components/ui/AppHeader";
import PrimaryActionButton from "@/components/ui/PrimaryActionButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';

export default function StatusScreen() {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadBooking = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getActiveBooking();

      setBooking({
        ...data.booking,
        carsAhead: data.carsAhead,
      });

      socket.connect();
      socket.emit("join_booking", data.booking.id);
    } catch (error) {
      console.log(error);
      const message = (error as any)?.response?.data?.message || (error as any)?.message || "Failed to fetch active booking";
      Toast.show({ type: 'error', text1: 'Unable to load booking', text2: String(message) });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooking();

    return () => {
      socket.disconnect();
    };
  }, [loadBooking]);

  useEffect(() => {
    socket.on("queue_updated", (data) => {
      setBooking((prev: any) => ({
        ...prev,
        carsAhead: data.carsAhead,
      }));
    });

    socket.on("booking_called", () => {
      setBooking((prev: any) => ({
        ...prev,
        status: "CALLED",
      }));
    });

    socket.on("booking_completed", () => {
      setBooking((prev: any) => ({
        ...prev,
        status: "COMPLETED",
      }));
    });

    return () => {
      socket.off("queue_updated");
      socket.off("booking_called");
      socket.off("booking_completed");
    };
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#f4fbf7] px-6" edges={["top", "left", "right", "bottom"]}>
        <AnimatedScreen className="w-full max-w-md rounded-[32px] border border-emerald-100 bg-white p-6 shadow-sm">
          <View className="items-center">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <Ionicons name="time" size={28} color="#0f7a47" />
            </View>
            <Text className="mt-4 text-2xl font-black text-emerald-950">
              Loading your active booking
            </Text>
            <Text className="mt-2 text-center text-sm leading-5 text-emerald-700">
              We are connecting to your live queue state now.
            </Text>
          </View>
        </AnimatedScreen>
      </SafeAreaView>
    );
  }

  if (!booking) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#f4fbf7] px-6" edges={["top", "left", "right", "bottom"]}>
        <AnimatedScreen className="w-full max-w-md rounded-[32px] border border-emerald-100 bg-white p-6 shadow-sm">
          <View className="items-center">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <Ionicons name="time" size={28} color="#0f7a47" />
            </View>
            <Text className="mt-4 text-2xl font-black text-emerald-950">No active booking</Text>
            <Text className="mt-2 text-center text-sm leading-5 text-emerald-700">
              Book fuel from the map to start live queue tracking here.
            </Text>
          </View>

          <View className="mt-5">
            <PrimaryActionButton title="Open map" onPress={() => router.replace("/")} />
          </View>
        </AnimatedScreen>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f4fbf7]" edges={["top", "left", "right", "bottom"]}>
    <View className="flex-1 bg-[#f4fbf7] px-5 pt-4">
      <AppHeader title="My booking" subtitle="Live queue and status updates" />

      <AnimatedScreen className="flex-1">
        <View className="rounded-[34px] bg-emerald-950 p-5">
          <Text className="text-xs uppercase tracking-[0.22em] text-emerald-200">
            Current queue
          </Text>
          <Text className="mt-3 text-6xl font-black text-white">{booking.carsAhead}</Text>
          <Text className="mt-2 text-sm text-emerald-100">Cars ahead of you</Text>
        </View>

        <View className="mt-5 rounded-[30px] border border-emerald-100 bg-white p-5 shadow-sm">
          <View className="rounded-2xl bg-emerald-50 px-4 py-4">
            <Text className="text-xs uppercase tracking-[0.22em] text-emerald-700">
              Booking reference
            </Text>
            <Text className="mt-1 text-lg font-black text-emerald-950">
              {booking.bookingNumber ? `#${booking.bookingNumber}` : `#${booking.id}`}
            </Text>
          </View>

          <View className="mt-3 rounded-2xl bg-emerald-50 px-4 py-4">
            <Text className="text-xs uppercase tracking-[0.22em] text-emerald-700">
              Vehicle plate
            </Text>
            <Text className="mt-1 text-lg font-black text-emerald-950">
              {booking.plateNumber ?? "Not provided"}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs uppercase tracking-[0.22em] text-emerald-700">Status</Text>
              <Text className="mt-1 text-2xl font-black text-emerald-950">{booking.status}</Text>
            </View>
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
              <Ionicons name="pulse" size={22} color="#0f7a47" />
            </View>
          </View>

          <View className="mt-4 rounded-2xl bg-emerald-50 px-4 py-4">
            <Text className="text-sm font-semibold text-emerald-700">Live updates are connected</Text>
            <Text className="mt-1 text-sm leading-5 text-emerald-700">
              We keep listening for queue changes, booking calls, and completion events.
            </Text>
          </View>
        </View>

        <View className="mt-5 gap-3">
          <PrimaryActionButton title="Go to map" onPress={() => router.replace("/")} />
          <PrimaryActionButton title="Refresh active booking" onPress={loadBooking} tone="ghost" loading={loading} />
        </View>
      </AnimatedScreen>
    </View>
    </SafeAreaView>
  );
}
