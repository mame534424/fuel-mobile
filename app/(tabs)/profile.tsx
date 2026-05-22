import {
  View,
  Text,
  Pressable,
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

export default function ProfileScreen() {

  const {
    user,
    logout,
    loading,
  } = useAuthStore();

  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.replace(
        "/auth/login"
      );

    }

  }, [user, loading]);

  if (loading) {

    return null;

  }

  if (!user) {

    return null;

  }

  return (

    <View
      className="
        flex-1
        items-center
        justify-center
      "
    >

      <Text
        className="
          text-2xl
          font-bold
        "
      >
        {user.email}
      </Text>

      <Pressable
        onPress={logout}

        className="
          mt-5
          rounded-2xl
          bg-red-500
          px-6
          py-4
        "
      >

        <Text
          className="
            text-white
          "
        >
          Logout
        </Text>

      </Pressable>

    </View>
  );
}