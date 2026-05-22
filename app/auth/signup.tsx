import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
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

    <View
      className="
        flex-1
        justify-center
        bg-background
        px-6
      "
    >

      <Text
        className="
          mb-10
          text-4xl
          font-bold
          text-primary
        "
      >
        Create Account
      </Text>

      {/* EMAIL */}

      <Controller
        control={control}
        name="email"

        render={({
          field: {
            onChange,
            value,
          },
        }) => (

          <TextInputField
            label="Email"

            value={value}

            onChange={onChange}

            error={
              errors.email?.message
            }
          />

        )}
      />

      {/* USERNAME */}

      <Controller
        control={control}
        name="username"

        render={({
          field: {
            onChange,
            value,
          },
        }) => (

          <TextInputField
            label="Username"

            value={value}

            onChange={onChange}

            error={
              errors.username?.message
            }
          />

        )}
      />

      {/* PASSWORD */}

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
              errors.password?.message
            }
          />

        )}
      />

      {/* CONFIRM PASSWORD */}

      <Controller
        control={control}
        name="confirmPassword"

        render={({
          field: {
            onChange,
            value,
          },
        }) => (

          <TextInputField
            label="Confirm Password"

            value={value}

            onChange={onChange}

            secureTextEntry

            error={
              errors
                .confirmPassword
                ?.message
            }
          />

        )}
      />

      {/* BUTTON */}

      <Pressable
        onPress={
          handleSubmit(
            onSubmit
          )
        }

        className="
          mt-5
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
            Sign Up
          </Text>

        )}

      </Pressable>

      {/* LOGIN LINK */}

      <Pressable
        onPress={() =>
          router.back()
        }

        className="mt-5"
      >

        <Text
          className="
            text-center
            text-gray-500
          "
        >
          Already have account?
          Login
        </Text>

      </Pressable>

    </View>
  );
}