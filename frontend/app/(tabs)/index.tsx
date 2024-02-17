import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Link href="/login/" asChild>
        <Pressable>
          <Text style = {{fontSize:30}}>Home</Text>
          
        </Pressable>
      </Link>
      <Link href="/appinfo1/" asChild>
        <Pressable>
          <Text style = {{fontSize:30}}>appinfo1</Text>
        </Pressable>
      </Link>
      <Link href="/appinfo2/" asChild>
        <Pressable>
          <Text style = {{fontSize:30}}>appinfo2</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
