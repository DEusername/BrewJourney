import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { Link } from "expo-router";
import PageHeader from "../components/PageHeader";
import { ScrollView } from "react-native";
import { YStack } from "tamagui";
import BrewCard from "../components/Card1";
import { BrewListContext } from "./_layout";
import { Button } from "tamagui";
export default function Home() {
  const brewList = useContext(BrewListContext);

  return (
    <View style={styles.container}>
      <PageHeader title="Home" />
      <View style={styles.content}>
        <Text style={styles.subheader}>Recent Brews:</Text>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          <YStack style={styles.list}>
            {brewList.map((brew) => (
              <View key={brew.id} style={styles.listItem}>
                <BrewCard
                  title={brew.title}
                  description={brew.description}
                  href={`/details/${brew.id}`}
                />
              </View>
            ))}
          </YStack>
        </ScrollView>
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
