import {
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface Dashboard {
  cardiovascular_health: {
    status: "green" | "yellow" | "red";
  };
  respiratory_health: {
    status: "green" | "yellow" | "red";
  };
  metabolic_health: {
    status: "green" | "yellow" | "red";
  };
}

export default function TabOneScreen() {
  async function signout() {
    await AsyncStorage.removeItem("token");
    router.push("/login/");
  }
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [dashboard, setDashboard] = useState<Dashboard>({
    cardiovascular_health: {
      status: "green",
    },
    respiratory_health: {
      status: "green",
    },
    metabolic_health: {
      status: "green",
    },
  });

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://prescriptionrx.net/home/dashboard",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      const parsed_response = await response.json();
      console.log(parsed_response);

      setName(parsed_response.user.name);
      setProfileImage(parsed_response.user.profile_image);
      setDashboard(parsed_response.dashboard);
    })();
  });
  return (
    <SafeAreaView style={{}}>
      <Image
        source={{ uri: profileImage }}
        style={{ width: 100, height: 100, borderRadius: 100 }}
      />
      <Text>Welcome Back {name}</Text>
      <View style={{ height: 50, width: 50, backgroundColor: "gray" }}></View>
      <TouchableOpacity
        onPress={signout}
        style={{
          backgroundColor: "red",
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
