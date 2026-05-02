import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Navbar() {
  return (
    <View>
      <Link href="/home" asChild>
        <Pressable>
          <Text>Home</Text>
        </Pressable>
      </Link>
      <Link href="/about" asChild>
        <Pressable>
          <Text>About</Text>
        </Pressable>
      </Link>
      <Link href="/profile" asChild>
        <Pressable>
          <Text>Profile</Text>
        </Pressable>
      </Link>
      <Link href="/chat" asChild>
        <Pressable>
          <Text>Chat</Text>
        </Pressable>
      </Link>
    </View>
  );
}
