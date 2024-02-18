import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export const getWidgetAsync = async (props: {
  onSuccess: any;
  token: string;
}) => {
  try {
    const response = await fetch(
      "https://api.tryterra.co/v2/auth/generateWidgetSession",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "dev-id": "prescriberx-testing-nS7RbPHovQ",
          "content-type": "application/json",
          "x-api-key": "Jsdwc5LNg2YaEGw3X9RDtxB8kMRbn-Ha",
        },
        body: JSON.stringify({
          reference_id: props.token,
          providers:
            "GARMIN,WITHINGS,FITBIT,GOOGLE,OURA,WAHOO,PELOTON,ZWIFT,TRAININGPEAKS,FREESTYLELIBRE,DEXCOM,COROS,HUAWEI,OMRON,RENPHO,POLAR,SUUNTO,EIGHT,APPLE,CONCEPT2,WHOOP,IFIT,TEMPO,CRONOMETER,FATSECRET,NUTRACHECK,UNDERARMOUR",
          language: "en",
        }),
      }
    );
    const json = await response.json();
    props.onSuccess(json.url);
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};

export default function TerraConnect() {
  async function showWidget() {
    const token = await AsyncStorage.getItem("token");
    try {
      const widget = await fetch(
        "https://api.tryterra.co/v2/auth/generateWidgetSession",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "dev-id": "prescriberx-testing-nS7RbPHovQ",
            "content-type": "application/json",
            "x-api-key": "Jsdwc5LNg2YaEGw3X9RDtxB8kMRbn-Ha",
          },
          body: JSON.stringify({
            reference_id: token,
            providers:
              "GARMIN,WITHINGS,FITBIT,GOOGLE,OURA,WAHOO,PELOTON,ZWIFT,TRAININGPEAKS,FREESTYLELIBRE,DEXCOM,COROS,HUAWEI,OMRON,RENPHO,POLAR,SUUNTO,EIGHT,APPLE,CONCEPT2,WHOOP,IFIT,TEMPO,CRONOMETER,FATSECRET,NUTRACHECK,UNDERARMOUR",
            language: "en",
            auth_success_redirect_url: "https://prescriptionrx.net/device/auth",
          }),
        }
      );
      const json = await widget.json();

      await WebBrowser.openBrowserAsync(json.url);

      router.replace("/(tabs)/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            color: "#000",
            marginVertical: 20,
            marginHorizontal: 20,
            marginTop: 50,
            fontWeight: "bold",
          }}
        >
          Connect health devices
        </Text>
        <View
          style={{
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Image
            source={require("../../assets/images/devices.png")}
            style={{
              width: width / 1.03,
              height: height / 1.7,
              alignSelf: "center",
              resizeMode: "stretch",
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 25,
          }}
        ></View>
        <TouchableOpacity onPress={showWidget}>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#fff",
              marginVertical: 20,
              marginHorizontal: 20,
              fontWeight: "bold",
              backgroundColor: "#00ab7c",
              paddingVertical: 14,
              borderRadius: 10,
            }}
          >
            Connect
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
