import { View, Text } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";

const App = () => {
  // useEffect(() => {
  //   (async () => {
  //     //if (await AsyncStorage.getItem("token")) {
  //     // router.replace("/(tabs)/");
  //     // } else {
  //     router.replace("/login/");
  //     // }
  //   })();
  // }, []);
  // TODO: Check if user is logged in
  return <Redirect href="/login/" />;
};

export default App;
