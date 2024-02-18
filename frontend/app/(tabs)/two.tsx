import React, { useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { AppBar } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function TChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (message.trim().length > 0) {
      const newMessage: Message = {
        id: Date.now(),
        text: message,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      setLoading(true);
      const botResponse = await askGPT3(message);
      const botMessage: Message = {
        id: Date.now(),
        text: botResponse,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setLoading(false);
    }
  };

  const OPENAI_API_KEY = "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"; // Make sure this is securely managed

  const askGPT3 = async (prompt: string) => {
    prompt =
      "As a health advisor answer very struct and informative based on user provided data " +
      prompt;

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].text.trim();
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <AppBar
            title="Chat with your Health"
            titleStyle={styles.appBarTitle}
            centerTitle
            color="#FFFFFF"
            elevation={0}
          />
          <ScrollView
            showsVerticalScrollIndicator={true}
            style={styles.scrollView}
          >
            {messages.map((msg) => (
              <View key={msg.id} style={styles.messageBubble}>
                <Text>{msg.text}</Text>
              </View>
            ))}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
          </ScrollView>
        </View>

        <View style={styles.messageInputContainer}>
          <TextInput
            placeholder="Type a message..."
            placeholderTextColor="black"
            selectionColor="#0077FF"
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.sendButton}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    height: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  keyboardAvoidingView: {
    height: "100%",
    flex: 1,
  },
  container: {
    height: "100%",
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 15,
  },
  appBarTitle: {
    color: "#000000",
    fontSize: 20,
  },
  scrollView: {
    marginTop: 5,
    height: "100%",
  },
  messageInputContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "green",
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#F7F7F7",
    marginRight: 5,
  },
  sendButton: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 15,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  messageBubble: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
});
