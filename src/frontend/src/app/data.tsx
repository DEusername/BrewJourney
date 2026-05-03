import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Data() {
  return (
    <View style={styles.container}>
      <View>
        <Text>My Data</Text>
        <Text>View your brewing data here</Text>
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
});