import { Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { Input } from "@tamagui/input";
import { Button } from "tamagui";
import PageHeader from "../components/PageHeader";
import { useState } from "react";
import React from "react";


export default function Chat() {
  const [messages, setMessages] = React.useState<string[]>([]);
  const [input, setInput] = React.useState("");
  return (
    <View style={styles.container}>
      <PageHeader title="Chat" />
      <View style={styles.content}>
        <Input size="$4" borderWidth={2} placeholder="Type your message here" />
      <Button size="$4" borderWidth={2} onPress={() => console.log("Send message")}>
        Send
      </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 40
  },
});