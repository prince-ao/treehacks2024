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
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FBFADA",
        marginTop: StatusBar.currentHeight,
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: profileImage }}
        style={{ width: 100, height: 100, borderRadius: 100, marginTop: 100 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
        Welcome Back {name}
      </Text>
      <View
        style={{
          marginTop: 70,
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: "#FBFADA",
          gap: 30,
          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity
          style={{
            height: 130,
            width: 130,
            backgroundColor: "#ADBC9F",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/images/heart.png")}
            style={{ width: 70, height: 70 }}
          />
          <View
            style={{
              top: -10,
              right: -10,
              position: "absolute",
              width: 30,
              height: 30,
              borderRadius: 30,
              backgroundColor: dashboard.cardiovascular_health.status,
            }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            height: 130,
            width: 130,
            backgroundColor: "#ADBC9F",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/images/kidneys.png")}
            style={{ width: 80, height: 80 }}
          />
          <View
            style={{
              top: -10,
              right: -10,
              position: "absolute",
              width: 30,
              height: 30,
              borderRadius: 30,
              backgroundColor: dashboard.metabolic_health.status,
            }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            height: 130,
            width: 130,
            backgroundColor: "#ADBC9F",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/images/lungs.png")}
            style={{ width: 70, height: 70 }}
          />
          <View
            style={{
              top: -10,
              right: -10,
              position: "absolute",
              borderRadius: 30,
              width: 30,
              height: 30,
              backgroundColor: dashboard.respiratory_health.status,
            }}
          ></View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={signout}
        style={{
          backgroundColor: "red",
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Link href="/terra-connect/">
          <Text>Go to terra</Text>
        </Link>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={signout}
        style={{
          backgroundColor: "red",
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text>Sign out</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
