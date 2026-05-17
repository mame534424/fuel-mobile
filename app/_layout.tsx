import "../global.css";

import { Stack } from "expo-router";

import ThemeProvider
from "@/theme/themeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="booking/[stationId]"
        />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signup" />
      </Stack>
    </ThemeProvider>
  );
}