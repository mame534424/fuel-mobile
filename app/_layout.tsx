import "../global.css";

import { Stack } from "expo-router";
import {
  GestureHandlerRootView,
}
from "react-native-gesture-handler";

import ThemeProvider from "@/theme/themeProvider";
import { useEffect } from "react";

import { useAuthStore } from "@/features/auth/stores/auth.stores";

export default function RootLayout() {
    const restoreSession =useAuthStore((state) => state.restoreSession);

    useEffect(() => {

        restoreSession();
    
    }, []);
    
  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
    >
        <ThemeProvider>
        <Stack
            screenOptions={{
            headerShown: false,
            }}
        >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="booking/[stationId]" />
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/signup" />
        </Stack>
        </ThemeProvider>
    </GestureHandlerRootView>
    
  );
}