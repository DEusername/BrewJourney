import { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import backend_port from "../environment";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    /*
    const formData = { email: email, password: password };
    console.log("FORM DATA:", formData);

    const response = await fetch(`${backend_port}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    var id = await response.json();
    console.log("ID: ", id);

    if (response.status == 200) {
      // It worked!
      console.log("Login successful!");
      setTimeout(() => {
        setLoading(false);
        router.replace("/home");
      }, 800);
    } else {
      console.log("Trouble logging in :(");
      setTimeout(() => {
        setLoading(false);
        router.replace("/login");
      }, 800);
    }
    */

    // setTimeout(() => {
    //   setLoading(false);
    //   router.replace("/home");
    // }, 800);

    setTimeout(() => {
      setLoading(false);
      router.replace("/home");
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#99ba90" }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.secondaryButtonText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
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
    borderColor: "#353232",
    padding: 12,
    borderRadius: 15,
  },
  button: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#809b78",
  },
  secondaryButtonText: {
    color: "#809b78",
  },
});
