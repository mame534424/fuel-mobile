import "../../global.css";

import {
  Tabs,
} from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function TabsLayout() {

  const insets =
    useSafeAreaInsets();

  return (

    <Tabs

      screenOptions={{

        headerShown: false,

        tabBarActiveTintColor:
          "#0f7a47",

        tabBarInactiveTintColor:
          "#7a8f7d",

        tabBarStyle: {

          backgroundColor:
            "rgba(255,255,255,0.95)",

          borderTopWidth: 0,

          elevation: 0,

          height:
            60 + insets.bottom,

          paddingBottom:
            insets.bottom,

          paddingTop: 10,
        },

        tabBarLabelStyle: {

          fontSize: 11,

          fontWeight: "600",
        },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{

          title: "Map",

          tabBarIcon:
            ({ color, size }) => (

            <Ionicons
              name="map"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="status"
        options={{

          title: "My Status",

          tabBarIcon:
            ({ color, size }) => (

            <Ionicons
              name="time"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{

          title: "Profile",

          tabBarIcon:
            ({ color, size }) => (

            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />

    </Tabs>
  );
}