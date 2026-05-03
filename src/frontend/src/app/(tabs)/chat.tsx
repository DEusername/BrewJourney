import React, { useState } from "react";
import { YStack, styled, Input, Button } from "tamagui";
import PageHeader from "../../components/PageHeader";
import { KeyboardAvoidingView, Platform } from "react-native";
import backend_port from "../../environment";
import { Text, StyleSheet } from "react-native";




export default function Chat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  return (
    <Container>
      <PageHeader title="Barista Chat" />
      <Text style={styles.output}>
        {response || "Waiting for response..."}
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <YStack flex={1} />
        <Content>
          <InputField value={input} onChangeText={setInput} />
          <SendBtn onPress={() => console.log("Send:", input)}>Send</SendBtn>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}

//main wrapper
export const Container = styled(YStack, {
  flex: 1,
});

//area holding inputs
export const Content = styled(YStack, {
  width: "100%",
  padding: "$4",
  justifyContent: "flex-start",
  gap: "$3",
  paddingBottom: Platform.OS === "ios" ? "$6" : "$4", // Extra padding for the "home bar"
});

export const InputField = styled(Input, {
  width: "100%",
  height: "$8",
  borderRadius: "$4",
  borderWidth: "$1",
  borderColor: "#411515be",
  placeholder: "Ask Brewy a question:",
  placeholderTextColor: "$gray10Dark",
});

export const SendBtn = styled(Button, {
  width: "100%",
  height: "$5",
  backgroundColor: "#68afd0",
  borderRadius: "$4",
  borderWidth: "$1",
  borderColor: "#000000be",
});

const styles = StyleSheet.create({
  output: {
    flex: 1,
  },);
