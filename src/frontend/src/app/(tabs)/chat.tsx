import React, { useState, useEffect } from "react";
import { YStack, styled, Input, Button } from "tamagui";
import PageHeader from "../../components/PageHeader";
import { FlatList, KeyboardAvoidingView, Platform, View, Text, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import backend_port from "../../environment";

const userId = 67;

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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

    const response = await fetch(`${backend_port}/conversations/${userId}`);
    const data = await response.json();

    console.log(data);
    setMessages(data);

    /*
    data.forEach(function(message) { // if error, ignore
      
      if (message.role == "model"){
        // ai message
      } else if (message.role == "user"){
        // user message
      }
      

    });
    */

  };

  const sendMessage = async () => {

    const response = await fetch(`${backend_port}/ai/coaching`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: {userID: userId, conversationID: 1, message: input}
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
      <SafeAreaView>
        <FlatList
          data={messages}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <YStack flex={1} />
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
