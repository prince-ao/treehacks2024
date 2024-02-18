import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import AsyncStorage from "@react-native-async-storage/async-storage";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#12372A" },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="chatbox" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
