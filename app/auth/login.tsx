import {View,Text,Pressable,ScrollView} from "react-native";
import { router } from "expo-router";
import {useForm,Controller} from "react-hook-form";
import { useState } from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import { loginSchema} from "@/features/auth/validation/login.schema";

import {loginUser} from "@/features/auth/services/auth.service";

import {useAuthStore} from "@/features/auth/stores/auth.stores";

import TextInputField from "@/components/ui/TextInputField";
import { useBookingStore} from "@/features/booking/stores/booking.store";
import AnimatedScreen from "@/components/ui/AnimatedScreen";
import AppHeader from "@/components/ui/AppHeader";
import PrimaryActionButton from "@/components/ui/PrimaryActionButton";


export default function LoginScreen() {

  const [loading, setLoading] = useState(false);

  const {pendingStationId,clearPendingStation} = useBookingStore();

  const login = useAuthStore( (state) => state.login);

  const {control,handleSubmit,formState: { errors }} = useForm({

    resolver:
      zodResolver(
        loginSchema
      ),

    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit =
    async (data: any) => {

      try {

        setLoading(true);

        const response = await loginUser(data);
        console.log("Login response:", response);

        await login(
          response.token,
          response.user
        );

        if (
            pendingStationId
        ) {

            router.replace(
                `/booking/${pendingStationId}`
            );

            clearPendingStation();

        } else {
            router.replace("/");
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
  };

  return (
    <View className="flex-1 bg-[#f4fbf7]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-5 pt-14">
          <AppHeader title="Welcome back" subtitle="Sign in to continue your fuel booking" onBack={() => router.replace("/")} />

          <AnimatedScreen className="flex-1 justify-between">
            <View className="rounded-[34px] bg-white p-5 shadow-sm">
              <Text className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Secure access
              </Text>
              <Text className="mt-2 text-3xl font-black text-emerald-950">
                Faster booking starts here
              </Text>
              <Text className="mt-2 text-sm leading-5 text-emerald-700">
                Log in once and keep your booking, queue tracking, and profile in sync.
              </Text>

              <View className="mt-6">
                <Controller
                  control={control}
                  name="identifier"
                  render={({ field: { onChange, value } }) => (
                    <TextInputField
                      label="Email or username"
                      value={value}
                      onChange={onChange}
                      placeholder="name@example.com"
                      autoCapitalize="none"
                      textContentType="username"
                      error={errors.identifier?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <TextInputField
                      label="Password"
                      value={value}
                      onChange={onChange}
                      placeholder="Enter your password"
                      secureTextEntry
                      textContentType="password"
                      error={errors.password?.message}
                    />
                  )}
                />
              </View>

              <PrimaryActionButton title="Login" onPress={handleSubmit(onSubmit)} loading={loading} />
            </View>

            <View className="pb-6 pt-4">
              <Pressable onPress={() => router.push("/auth/signup")} className="items-center rounded-2xl border border-emerald-200 bg-white py-4">
                <Text className="text-base font-semibold text-emerald-900">
                  Don’t have an account? Sign up
                </Text>
              </Pressable>
            </View>
          </AnimatedScreen>
        </View>
      </ScrollView>
    </View>
  );
}