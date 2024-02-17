/// <reference types="nativewind/types" />
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function login() {
    if (email !== "" && password !== "") {
      const response = await fetch("https://prescriptionrx.net/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const parsed_response = await response.json();
      await AsyncStorage.setItem("token", parsed_response.token);
      setEmail("");
      setPassword("");
      router.replace("/(tabs)/");
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FBFADA",
        marginTop: StatusBar.currentHeight,
      }} /** Remote white background */
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FBFADA" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ paddingTop: 14, paddingHorizontal: 8 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={require("../../assets/images/Logo.png")}
              resizeMode="stretch"
              className="w-1/4 h-[30px]"
              style={{ width: width / 4, height: height / 30 }}
            ></Image>

            <Text style={{ fontSize: 20, marginTop: 30 }}>
              Welcome Back to PrescriptionRx
            </Text>
            <Text style={{ marginTop: 10, marginBottom: 30 }}>
              Hello there, sign in to continue!
            </Text>

            <TextInput
              label="Email"
              value={email}
              selectionColor={"#436850"}
              mode="outlined"
              left={
                <TextInput.Icon
                  icon="email"
                  color={"#C0C0C0"}
                  style={{ marginTop: 15 }}
                />
              }
              activeOutlineColor={"#8ee04e"}
              outlineColor={"#C0C0C0"}
              dense={true}
              style={{ height: 50, flex: 1, backgroundColor: "#FBFADA" }}
              theme={{
                roundness: 27,
                colors: { onSurfaceVariant: "#000" },
              }}
              textColor={"#000"}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              label="Password"
              value={password}
              selectionColor={"#436850"}
              secureTextEntry={!isPasswordVisible}
              mode="outlined"
              left={
                <TextInput.Icon
                  icon="lock"
                  color={"#C0C0C0"}
                  style={{ marginTop: 15 }}
                />
              }
              right={
                <TextInput.Icon
                  icon={isPasswordVisible ? "eye-off" : "eye"}
                  color={"#C0C0C0"}
                  onPress={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                    return false;
                  }}
                  style={{ marginTop: 15 }}
                  size={22}
                />
              }
              activeOutlineColor={"#8ee04e"}
              outlineColor={"#C0C0C0"}
              dense={true}
              style={{
                marginTop: 20,
                height: 50,
                flex: 1,
                backgroundColor: "#FBFADA",
              }}
              theme={{
                roundness: 27,
                colors: { onSurfaceVariant: "#000" },
              }}
              textColor={"#000"}
              onChangeText={(text) => setPassword(text)}
            />

            <View
              style={{ alignItems: "flex-end", marginTop: 10, marginEnd: 3 }}
            >
              <TouchableOpacity onPress={() => {}}>
                <Text style={{ marginBottom: 30 }}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                onPress={login}
                style={{
                  backgroundColor: "#12372A",
                  borderRadius: 30,
                  paddingVertical: 20,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white" }}>Login</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 40,
                marginBottom: 10,
              }}
            >
              <Text>Don't have an account?</Text>
              <TouchableOpacity>
                <Link href="/signup/" replace>
                  <Text style={{ color: "#0077FF" }}>Sign Up</Text>
                </Link>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
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
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;
