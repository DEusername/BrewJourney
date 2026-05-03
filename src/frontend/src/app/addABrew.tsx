import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import PageHeader from "../components/PageHeader";
import { FormsDemo } from "../components/Form1";
import { Input } from "tamagui";


export default function AddABrew() {
  return (
    <View style={styles.container}>
          <PageHeader title="Add a Brew" />
          <View style={styles.container}>
            <FormsDemo />


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
