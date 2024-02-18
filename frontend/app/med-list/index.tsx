import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [arr, setArr] = useState([]);

  //   async function signup() {
  //     if (
  //       email !== "" &&
  //       password !== "" &&
  //       firstName !== "" &&
  //       lastName !== ""
  //     ) {
  //       setLoading(true);

  //       try {
  //         const response = await fetch("https://prescriptionrx.net/auth/signup", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             email,
  //             password,
  //             first_name: firstName,
  //             last_name: lastName,
  //           }),
  //         });
  //         const parsed_response = await response.json();
  //         await AsyncStorage.setItem("token", parsed_response.token);
  //       } catch (e: any) {
  //         setError(e);
  //       }
  //       setLoading(false);

  //       setEmail("");
  //       setPassword("");
  //       setFirstName("");
  //       setLastName("");
  //       if (error.length === 0) router.replace("/appinfo1/");
  //     }
  //   }

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://prescriptionrx.net/accounts/medication"
        );
        const data = await response.json();

        setArr(data);
      } catch (e: any) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {arr.map((item: any) => (
        <View>
          <Text>{item.name}</Text>
          <Image source={{ uri: item.image }} />
        </View>
      ))}
    </SafeAreaView>
  );
}
