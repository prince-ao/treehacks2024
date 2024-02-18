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
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

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
          auth_success_redirect_url: "https://google.com",
          auth_failure_redirect_url: "https://google.com/",
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
  const [url, setUrl] = useState("");

  const _handleURL = (event: { url: any }) => {
    if (Platform.OS === "ios") {
      WebBrowser.dismissBrowser();
    }
    console.log(event.url);
  };
  const _handlePressButtonAsync = async () => {
    const token = (await AsyncStorage.getItem("token")) as string;
    getWidgetAsync({ onSuccess: setUrl, token });
    await WebBrowser.openBrowserAsync(url);
  };

  useEffect(() => {
    async () => {
      const token = (await AsyncStorage.getItem("token")) as string;
      Linking.addEventListener("url", _handleURL);
      getWidgetAsync({ onSuccess: setUrl, token });
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFADA" }}>
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
        <TouchableOpacity onPress={_handlePressButtonAsync}>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#fff",
              marginVertical: 20,
              marginHorizontal: 20,
              fontWeight: "bold",
              backgroundColor: "#436850",
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
