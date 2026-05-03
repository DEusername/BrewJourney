import { Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { Input } from "@tamagui/input";
import { Button } from "tamagui";

export default function Chat() {
  return (
    <View style={styles.container}>
      <View>
        <Text>chat here</Text>
      </View>
      <Input size="$4" borderWidth={2} placeholder="Type your message here" />
      <Button size="$4" borderWidth={2} onPress={() => console.log("Send message")}>
        Send
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});