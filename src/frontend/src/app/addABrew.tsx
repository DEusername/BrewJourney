import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

export default function AddABrew() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Add a Brew Page</Text>
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
