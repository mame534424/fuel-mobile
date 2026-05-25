import {
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";

import { router } from "expo-router";

import {
  useForm,
  Controller,
} from "react-hook-form";

import { useState } from "react";

import { zodResolver }
from "@hookform/resolvers/zod";

import { signupSchema }
from "@/features/auth/validation/signup.schema";

import { signupUser }
from "@/features/auth/services/auth.service";

import TextInputField
from "@/components/ui/TextInputField";
import AnimatedScreen from "@/components/ui/AnimatedScreen";
import AppHeader from "@/components/ui/AppHeader";
import PrimaryActionButton from "@/components/ui/PrimaryActionButton";

export default function SignupScreen() {

  const [loading, setLoading] =
    useState(false);

  const {
    control,
    handleSubmit,

    formState: {
      errors,
    },

  } = useForm({

    resolver:
      zodResolver(
        signupSchema
      ),

    defaultValues: {

      email: "",

      username: "",

      password: "",

      confirmPassword: "",

    },
  });

  const onSubmit =
    async (data: any) => {

      try {

        setLoading(true);

        const signupData = {

          email:
            data.email,

          username:
            data.username,

          password:
            data.password,
        };

        await signupUser(
          signupData
        );

        router.replace(
          "/auth/login"
        );

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
          <AppHeader title="Create account" subtitle="Join Fuel to book and track stations" onBack={() => router.back()} />

          <AnimatedScreen className="flex-1 justify-between">
            <View className="rounded-[34px] bg-white p-5 shadow-sm">
              <Text className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
                One-time setup
              </Text>
              <Text className="mt-2 text-3xl font-black text-emerald-950">
                Set up your profile in minutes
              </Text>
              <Text className="mt-2 text-sm leading-5 text-emerald-700">
                Create your account to save bookings and keep your status live across devices.
              </Text>

              <View className="mt-6">
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <TextInputField
                      label="Email"
                      value={value}
                      onChange={onChange}
                      placeholder="name@example.com"
                      autoCapitalize="none"
                      textContentType="emailAddress"
                      error={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, value } }) => (
                    <TextInputField
                      label="Username"
                      value={value}
                      onChange={onChange}
                      placeholder="your username"
                      autoCapitalize="none"
                      textContentType="username"
                      error={errors.username?.message}
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
                      placeholder="Create a password"
                      secureTextEntry
                      textContentType="newPassword"
                      error={errors.password?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, value } }) => (
                    <TextInputField
                      label="Confirm password"
                      value={value}
                      onChange={onChange}
                      placeholder="Repeat your password"
                      secureTextEntry
                      textContentType="newPassword"
                      error={errors.confirmPassword?.message}
                    />
                  )}
                />
              </View>

              <PrimaryActionButton title="Sign up" onPress={handleSubmit(onSubmit)} loading={loading} />
            </View>

            <View className="pb-6 pt-4">
              <Pressable onPress={() => router.back()} className="items-center rounded-2xl border border-emerald-200 bg-white py-4">
                <Text className="text-base font-semibold text-emerald-900">Already have an account? Login</Text>
              </Pressable>
            </View>
          </AnimatedScreen>
        </View>
      </ScrollView>
    </View>
  );
}