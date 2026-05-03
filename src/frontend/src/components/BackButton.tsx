import { router } from "expo-router";
import { Button } from "react-native";

export function BackButton() {
  return (
    <Button title="Back" onPress={() => router.back()} />
  );
}