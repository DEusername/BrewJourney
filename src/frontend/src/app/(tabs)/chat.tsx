import React, { useState, useEffect } from "react";
import { YStack, styled, Input, Button } from "tamagui";
import PageHeader from "../../components/PageHeader";
import { FlatList, KeyboardAvoidingView, Platform, View, Text, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import backend_port from "../../environment";

const userId = 67;

const Item = ({content}) => (
  <View style={styless.item}>
    <Text style={styless.content}>{content}</Text>
  </View>
);

const styless = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastInput, setLastInput] = useState([]);

  const fetchConversations = async () => {

    console.log("fetching messages");
    const response = await fetch(`${backend_port}/conversations/${1}`);
    const data = await response.json();

    console.log("Past messages: ", data);
    let newArray = [];

    data.forEach(function(aiMessage) { // if error, ignore
      

      if (aiMessage.role == "model"){
        // ai message
        const incomingMessage = {
          id: 1,
          content: [aiMessage.RECOMMENDATIONS]
        }
        newArray.push(incomingMessage);
      } else if (aiMessage.role == "user"){
        // user message
        // ai message
        const incomingMessage = {
          id: 1,
          content: aiMessage.CURRENT_USER_MESSAGE
        }
        newArray.push(incomingMessage);
      }

      console.log(newArray);

    });

    console.log(newArray);
    setMessages(newArray);

  };

  const sendMessage = async () => {

    console.log("Sending a message")
    const response = await fetch(`${backend_port}/ai/coaching`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({userID: userId, conversationID: 1, message: input})
    })

    const data = await response.json();

    console.log(data);

  }

  useEffect(() => {

    fetchConversations();

  }, [])

  return (
    <Container>
      <PageHeader title="Barista Chat" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <YStack/>
        <FlatList style={styless.container}
          data={messages}
          renderItem={({item}) => <Item content={item.content} />}
          keyExtractor={item => item.id}
        />
        <Content>
          <InputField value={input} onChangeText={setInput} />
          <SendBtn onPress={() => sendMessage()}>Send</SendBtn>
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
    flex: 1
  },
});
