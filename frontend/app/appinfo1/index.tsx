import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

// Page 2 content as a separate functional component
const Page2 = () => (
  <View>
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    <View style={{ justifyContent: "center", marginTop: 20 }}>
      <Image
        source={require("../../assets/images/2.png")}
        style={{
          width: width - 70,
          height: height / 2.5,
          alignSelf: "center",
          resizeMode: "stretch",
        }}
      />
    </View>
    <Text
      style={{
        textAlign: "center",
        color: "#000000",
        marginVertical: 20,
        marginHorizontal: 20,
        marginTop: 0,
        fontSize: 24,
      }}
    >
      100+ devices to select from
    </Text>
    <View style={{ paddingHorizontal: 20, paddingTop: 0 }}>
      <Text style={{ color: "#00000040", textAlign: "center", fontSize: 16 }}>
        Starting from smart watches to smart scales. We are here to help you
        achieve your wellness goals.
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 47,
        }}
      ></View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            borderColor: "#E0E0E0",
            borderWidth: 1,
            padding: 4,
            borderRadius: 20,
            backgroundColor: "#E0E0E0",
            marginHorizontal: 5,
          }}
        ></View>
        <View
          style={{
            borderColor: "#00ab7c",
            borderWidth: 1,
            paddingHorizontal: 12,
            borderRadius: 10,
            backgroundColor: "#00ab7c",
            paddingVertical: 4,
          }}
        ></View>
      </View>
    </View>
  </View>
);

export default function On2() {
  const navigation = useNavigation();
  const [screen, setScreen] = useState(1);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {screen === 1 ? (
          // Content for Page 1
          <View>
            <View style={{ justifyContent: "center", marginTop: 20 }}>
              <Image
                source={require("../../assets/images/123.png")}
                style={{
                  width: width - 70,
                  height: height / 2.5,
                  alignSelf: "center",
                  resizeMode: "stretch",
                }}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                color: "#12372A",
                marginVertical: 20,
                marginHorizontal: 20,
                marginTop: 50,
                fontSize: 24,
              }}
            >
              Welcome to PrescribeRX
            </Text>
            <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
              <Text
                style={{
                  color: "#12372A",
                  textAlign: "center",
                  fontSize: 16,
                  marginTop: -40,
                }}
              >
                We monitor your health 24 hours and 7 days a week. We are here
                to help you achieve your wellness goals. With our advanced
                technology, we track your health and wellness.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 20,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    borderColor: "#00ab7c",
                    borderWidth: 1,
                    paddingHorizontal: 12,
                    borderRadius: 10,
                    backgroundColor: "#00ab7c",
                    paddingVertical: 4,
                  }}
                ></View>
                <View
                  style={{
                    borderColor: "#E0E0E0",
                    borderWidth: 1,
                    padding: 4,
                    borderRadius: 20,
                    backgroundColor: "#E0E0E0",
                    marginHorizontal: 5,
                  }}
                ></View>
              </View>
            </View>
          </View>
        ) : (
          <Page2 />
        )}
        <TouchableOpacity
          onPress={() => {
            if (screen === 2) router.push("/terra-connect/");
            setScreen(screen === 1 ? 2 : 2);
          }}
          style={{
            backgroundColor: "#00ab7c",
            borderRadius: 30,
            paddingVertical: 20,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 20,
            marginTop: 30,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
