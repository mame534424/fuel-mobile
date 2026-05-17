import "../../global.css"

import { View, Text, Pressable }
from "react-native";

import { useThemeStore }
from "@/stores/themeStore";

export default function MapScreen() {

  const {
    theme,
    toggleTheme,
  } = useThemeStore();

  return (
    <View
      className="
        flex-1
        items-center
        justify-center
        bg-background
        dark:bg-black
      "
    >
      <Text
        className="
          text-3xl
          font-bold
          text-green-700
          dark:text-white
        "
      >
        E-Fuel
      </Text>

      <Text
        className="
          mt-3
          text-black
          dark:text-white
        "
      >
        Current Theme: {theme}
      </Text>

      <Pressable
        onPress={toggleTheme}
        className="
          mt-6
          rounded-2xl
          bg-green-700
          px-6
          py-4
        "
      >
        <Text className="text-white">
          Toggle Theme
        </Text>
      </Pressable>
    </View>
  );
}