import { useState } from "react";
import { router } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import backend_port from "../environment";

export default function Index() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    const formData = { firstName:firstName, lastName:lastName, email:email, password:password };
    console.log("FORM DATA:", formData);

    const response = await fetch(`${backend_port}/users/signup`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    })

    if (response.status == 201){
      // It worked!
      console.log("Sign up successful!");
      setTimeout(() => {
      setLoading(false);
      router.replace("/home");
    }, 800);
    } else {
      console.log("Trouble signing up :(")
      setTimeout(() => {
      setLoading(false);
      router.replace("/signup");
    }, 800);
    }

    // setTimeout(() => {
    //   setLoading(false);
    //   router.replace("/home");
    // }, 800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input}
      />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input}
      />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input}
      />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry
      />
      <Button title={loading ? "Loading..." : "Sign Up"} onPress={handleSignup} disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
});