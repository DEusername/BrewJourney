import { Stack, useSegments } from "expo-router";
import Navbar from "../components/navbar";
import { View } from "react-native";

export default function RootLayout() {
  const segments = useSegments();
  const showNavbar = segments.length > 0 && segments[0] !== "index";

  return (
    <View style={{ flex: 1 }}>
      {showNavbar && <Navbar />}
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}
