import { Text, View, StyleSheet, Pressable } from "react-native";
import  TabLayout  from "./_layout";
import { Redirect, Stack } from "expo-router";

export default function Tab() {
  return (
    <Redirect href="/home" />
  );
}



