import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import PageHeader from "../components/PageHeader";
import { FormsDemo } from "../components/Form1";
import { Input } from "tamagui";
import { Stack } from "expo-router/build/layouts/Stack";


export default function AddABrew() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Add a Brew"}} />
          <PageHeader title="Add a Brew" />
            <View style={styles.scroll}  >
              <FormsDemo />


              <Text>Add a Brew Page</Text>
            </View>
          
        </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
  scroll: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  scrollContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  list: {
    width: "100%",
  },
  listItem: {
    width: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLink: {
    width: "100%",
  },
  subheader: {
    justifyContent: "flex-start",
    color: "black",
    fontSize: 27,
    paddingTop: 10,
  },
});
