import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import Navbar from "../components/navbar";

export default function Index() {
  return (
    <View>
      <Navbar />
      <View>
        
        <Text>Welcome to BrewJourney!</Text>
        <Link href="/home" asChild>
          <Pressable >
            <Text >Start your journey</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

