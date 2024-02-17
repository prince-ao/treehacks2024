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

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "white",
      }} /** Remote white background */
    >
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
              selectionColor={"#123456"}
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
              style={{ height: 50, flex: 1, backgroundColor: "white" }}
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
              selectionColor={"#123456"}
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
              style={{ height: 50, flex: 1, backgroundColor: "white" }}
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
                <Text style={{ marginBottom: 30 }}>Forgot?</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: "#8ee04e",
                  borderRadius: 30,
                  paddingVertical: 20,
                  alignItems: "center",
                }}
              >
                <Text className="text-lg">Login</Text>
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
              <TouchableOpacity onPress={() => {}}>
                <Text style={{ color: "#0077FF" }}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;
