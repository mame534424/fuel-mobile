import {View,Text,Pressable,ActivityIndicator} from "react-native";
import { router } from "expo-router";
import {useForm,Controller} from "react-hook-form";
import { useState } from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import { loginSchema} from "@/features/auth/validation/login.schema";

import {loginUser} from "@/features/auth/services/auth.service";

import {useAuthStore} from "@/features/auth/stores/auth.stores";

import TextInputField from "@/components/ui/TextInputField";
import { useBookingStore} from "@/features/booking/stores/booking.store";


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
            router.back();
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
  };

  return (
    <View
      className="flex-1 justify-center bg-background px-6"
    >

      <Text
        className="mb-10 text-4xl font-bold text-primary"
      >
        Welcome Back
      </Text>

      <Controller
        control={control}
        name="identifier"

        render={({
          field: {
            onChange,
            value,
          },
        }) => (

          <TextInputField
            label="Email|username"
            value={value}
            onChange={onChange}
            error={
              errors.identifier?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name="password"

        render={({
          field: {
            onChange,
            value,
          },
        }) => (

          <TextInputField
            label="Password"

            value={value}

            onChange={onChange}

            secureTextEntry

            error={
              errors.password
                ?.message
            }
          />
        )}
      />

      <Pressable
        onPress={
          handleSubmit(onSubmit)
        }

        className="mt-5 h-14 items-center justify-center rounded-2xl bg-primary"
      >

        {loading ? (

          <ActivityIndicator
            color="white"
          />

        ) : (

          <Text
            className="text-lg font-bold text-white"
          >
            Login
          </Text>

        )}

      </Pressable>

      <Pressable
        onPress={() =>
          router.push(
            "/auth/signup"
          )
        }
        className="mt-5"
      >
        <Text
          className="
            text-center
            text-gray-500
          "
        >
          Don’t have account?
          Sign Up
        </Text>
      </Pressable>

    </View>
  );
}