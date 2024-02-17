import { View, Text } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const App = () => {
  useEffect(() => {
    (async () => {
      if (await AsyncStorage.getItem("token")) {
        router.replace("/(tabs)/");
      } else {
        router.replace("/login/");
      }
    })();
  }, []);
  return <View></View>;
};

export default App;
