import {
  View,
  Text,
} from "react-native";

import {
  router,
} from "expo-router";

import {
  useEffect,
} from "react";

import {
  useAuthStore,
} from "@/features/auth/stores/auth.stores";
import AnimatedScreen from "@/components/ui/AnimatedScreen";
import AppHeader from "@/components/ui/AppHeader";
import PrimaryActionButton from "@/components/ui/PrimaryActionButton";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {

  const {
    user,
    logout,
    loading,
  } = useAuthStore();

  if (!loading && !user) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#f4fbf7]">
      <Text className="text-lg font-semibold text-emerald-950">
        You are not logged in
      </Text>

      <View className="mt-5 w-full px-5">
        <PrimaryActionButton
          title="Login"
          onPress={() => router.push("/auth/login")}
        />
      </View>
    </SafeAreaView>
  );
}

  return (
    <SafeAreaView className="flex-1 bg-[#f4fbf7]" edges={["top", "left", "right", "bottom"]}>
    <View className="flex-1 bg-[#f4fbf7] px-5 pt-4">
      <AppHeader title="Profile" subtitle="Your account and access settings" />

      <AnimatedScreen className="flex-1">
        <View className="rounded-[34px] bg-white p-5 shadow-sm">
          <View className="items-center">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <Ionicons name="person" size={34} color="#0f7a47" />
            </View>
            <Text className="mt-4 text-2xl font-black text-emerald-950">
              {user?.username}
            </Text>
            <Text className="mt-1 text-sm text-emerald-700">{user?.email}</Text>
          </View>

          <View className="mt-6 gap-3 rounded-3xl bg-emerald-50 p-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-emerald-700">Role</Text>
              <Text className="text-sm font-semibold text-emerald-950">{user?.role}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-emerald-700">Account status</Text>
              <Text className="text-sm font-semibold text-emerald-950">{user?.isActive ? "Active" : "Inactive"}</Text>
            </View>
          </View>

          <View className="mt-6">
            <PrimaryActionButton title="Logout" onPress={logout} tone="ghost" />
          </View>
        </View>
      </AnimatedScreen>
    </View>
    </SafeAreaView>
  );
}