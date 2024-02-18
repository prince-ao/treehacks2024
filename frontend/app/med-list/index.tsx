import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { Link, useLocalSearchParams } from "expo-router";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [arr, setArr] = useState([]);

  const params = useLocalSearchParams();
  const { from } = params;

  useEffect(() => {
    (async () => {
      if (from === "heart") {
        try {
          const response = await fetch(
            "https://prescriptionrx.net/accounts/medication"
          );
          const data = await response.json();

          setArr(data);
        } catch (e: any) {
          console.log(e);
        }
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <SafeAreaView
          style={{
            marginTop: StatusBar.currentHeight,
            backgroundColor: "white",
            flex: 1,
          }}
        >
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          {arr.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 180, height: 220 }}
                source={require("../../assets/images/doc.png")}
              />
              <Text style={{ fontSize: 27, fontWeight: "bold", marginTop: 9 }}>
                Your all good!
              </Text>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  marginTop: 9,
                  backgroundColor: "#00ab7c",
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "white" }}>Go back</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 9,
                  marginBottom: 20,
                }}
              >
                Medications that we recommend
              </Text>
              {arr.map((item: any, i) => (
                <View key={i}>
                  <View style={{ marginBottom: 30, marginStart: 10 }}>
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={{
                        width: 120,
                        height: 120,
                        backgroundColor: "#000",
                      }}
                    />
                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </SafeAreaView>
      )}
    </>
  );
}
