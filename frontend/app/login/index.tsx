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
        <View style={{ paddingTop: 14, paddingHorizontal: 8 , backgroundColor : "white"}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={require("../../assets/images/logo1.png")}
              resizeMode="stretch"
              className="w-1/4 h-[30px]"
              style={{ width: width / 2, height: height / 4.5, alignSelf: "center"}}
            ></Image>

            {/* <Text style={{ fontSize: 20, marginTop: 30 }}>
              Welcome Back to PrescriptionRx
            </Text> */}
            <Text style={{fontSize:20 , marginTop: 0, marginBottom: 30, alignSelf:"center"}}>
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
                  style={{ marginTop: 15}}
                />
              }
              activeOutlineColor={"#00ab7c"}
              outlineColor={"#00ab7c"}
              dense={true}
              style={{ height: 50, flex: 1, backgroundColor: "white", marginBottom:15 }}
              theme={{
                roundness: 27,
                colors: { onSurfaceVariant: "#000" },
              }}
              textColor={"white"}
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
              activeOutlineColor={"#00ab7c"}
              outlineColor={"#00ab7c"}
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
              <TouchableOpacity onPress={() =>  {}}>
                <Text style={{ marginBottom: 30 }}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: -18 }}>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: "#00ab7c",
                  borderRadius: 30,
                  paddingVertical: 20,
                  alignItems: "center",
                  justifyContent: "center"
                  

                }}
              >
                <Text style = {{ color: "white", fontSize:20}}>Login</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 40,
                marginBottom: 0,
                marginTop: -15
              }}
            >
              <Text style = {{ color: "black", fontSize:15}}>Don't have an account?</Text>
              <TouchableOpacity>
                <Link href="/signup/">
                 <Text style = {{ color: "#0077FF", fontSize:15}}>  Sign Up</Text>
                </Link>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;
