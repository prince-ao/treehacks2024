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
  } from "react-native";
  import React, { useState, useContext } from "react";
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
  
    async function signup() {
      if (
        email !== "" &&
        password !== "" &&
        firstName !== "" &&
        lastName !== ""
      ) {
        console.log("here");
        const response = await fetch("https://prescriptionrx.net/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            first_name: firstName,
            last_name: lastName,
          }),
        });
        const parsed_response = await response.json();
        console.log(parsed_response);
        await AsyncStorage.setItem("token", parsed_response.token);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        router.replace("/(tabs)/");
      }
    }
  
    return (
      <SafeAreaView
        style={{
          marginTop: StatusBar.currentHeight,
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#white" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingTop: 0,
              flex: 1,
              marginHorizontal: 20,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={require("../../assets/images/logo1.png")}
              resizeMode="stretch"
              className="w-1/4 h-[30px]"
              style={{ width: width / 2, height: height / 4.5, alignSelf: "center", marginTop: 20}}
            ></Image>
  
              <Text style={{ marginTop: 0, fontSize: 20, color: "black", alignSelf:"center", marginBottom: 22}}>
                Getting Started
              </Text>
              {/* <Text
                style={{
                  fontSize: 14,
                  color: "#00000040",
                  marginTop: 10,
                  marginBottom: 30,
                }}
              >
                Hello there, sign up to continue!
              </Text>
   */}
              <TextInput
                label="First name"
                value={firstName}
                selectionColor={"#436850"}
                mode="outlined"
                
                
                
                left={
                  <TextInput.Icon
                    icon="account"
                    color={"#00000020"}
                    style={{ marginTop: 15 }}
                  />
                }
                activeOutlineColor={"#00ab7c"}
                outlineColor={"#00ab7c"}
                dense={true}
                contentStyle={{}}
                style={{
                  backgroundColor: "white",
                  height: 55,
                  paddingHorizontal: 10,
                  flex: 1,
                  lineHeight: 20,
                  
                }}
                theme={{
                  roundness: 27,
                  colors: { onSurfaceVariant: "#00000040",primary: "#000" },
          
                }}
                textColor={"#000"}
                onChangeText={(text) => setFirstName(text)}
              />
  
              <TextInput
                label="Last name"
                value={lastName}
                selectionColor={"#00ab7c"}
                mode="outlined"
                
                left={
                  <TextInput.Icon
                    icon="account"
                    color={"#00000020"}
                    style={{ marginTop: 15 }}
                  />
                }
                activeOutlineColor={"#00ab7c"}
                outlineColor={"#00ab7c"}
                dense={true}
                contentStyle={{}}
                style={{
                  backgroundColor: "white",
                  height: 55,
                  paddingHorizontal: 10,
                  flex: 1,
                  lineHeight: 20,
                  marginTop: 15,
                }}
                theme={{
                  roundness: 27,
                  colors: { onSurfaceVariant: "#00000040" },
                }}
                textColor={"#000"}
                onChangeText={(text) => setLastName(text)}
              />
  
              <TextInput
                label="Email"
                value={email}
                selectionColor={"#00ab7c"}
                mode="outlined"
                
                left={
                  <TextInput.Icon
                    icon="email"
                    color={"#00000020"}
                    style={{ marginTop: 15 }}
                  />
                }
                activeOutlineColor={"#00ab7c"}
                outlineColor={"#00ab7c"}
                dense={true}
                contentStyle={{}}
                
                style={{
                  backgroundColor: "white",
                  height: 55,
                  paddingHorizontal: 10,
                  flex: 1,
                  lineHeight: 20,
                  marginTop: 15,
                }}
                theme={{
                  roundness: 27,
                  colors: { onSurfaceVariant: "#00000040" },
                }}
                textColor={"#000"}
                onChangeText={(text) => setEmail(text)}
              />
  
              <TextInput
                label="Password"
                value={password}
                selectionColor={"#00ab7c"}
                secureTextEntry={isPasswordVisible}
                mode="outlined"
                left={
                  <TextInput.Icon
                    icon="lock"
                    color={"#00000020"}
                    style={{ marginTop: 15 }}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? "eye-off" : "eye"}
                    onPress={() => {
                      setIsPasswordVisible(!isPasswordVisible);
                      return false;
                    }}
                    color={"#00000020"}
                    style={{ marginTop: 15 }}
                    size={22}
                  />
                }
                activeOutlineColor={"#00ab7c"}
                outlineColor={"#00ab7c"}
                dense={true}
                contentStyle={{}}
                style={{
                  backgroundColor: "white",
                  height: 55,
                  paddingHorizontal: 10,
                  flex: 1,
                  lineHeight: 20,
                  marginTop: 15,
                  
                }}
                theme={{
                  roundness: 27,
                  colors: { onSurfaceVariant: "#00000040" },
                }}
                textColor={"#000"}
                onChangeText={(text1) => setPassword(text1)}
              />
  
              <View style={{ marginTop: 30 }}>
                <TouchableOpacity
                  onPress={signup}
                  style={{
                    backgroundColor: "#00ab7c",
                  borderRadius: 30,
                  paddingVertical: 20,
                  alignItems: "center",
                  justifyContent: "center"
                  
                  }}
                >
                  <Link href="/appinfo1/">
  <Text style={{ fontSize: 16, color: "white" }}>Sign Up</Text>
</Link>
                </TouchableOpacity>
              </View>
  
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingTop: 40,
                  marginBottom: 0,
                  marginTop : -15
                }}
              >
                <Text style={{ color: "#00000040", fontSize: 14}}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Link href="/login/" replace>
                    <Text style={{ color: "#0000EE", fontSize: 14 }}>
                      {" "}
                      Sign In
                    </Text>
                  </Link>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }