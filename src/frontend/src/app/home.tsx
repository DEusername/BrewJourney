import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useContext, useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { ScrollView } from "react-native";
import { Portal, PortalProvider, YStack } from "tamagui";
import BrewCard from "../components/Card1";
import { BrewListContext } from './_layout';
import { Stack } from "expo-router";
import backend_port from "../environment";

const userId = 67;

interface Logs { 
  id: number,
  userId: number,
  grinderId: number,
  brewMethodId: number,
  coffeeName: string,
  roastLevel: number, // 1-5: Light, Medium-Light, Medium, Medium-Dark, Dark
  targetRatio: string, // coffee:water ratio (in grams)
  doseGrams: number, // Grams are usually measured in whole numbers, right? Rarely have half a gram
  targetWaterGrams: number, // Recommended water grams for the method/grounds, auto-calculated and stored in the brew log
  actualWaterGrams: number, // User inputted, weighed after the coffee is made
  grindSize: number, // Number used on grinder?
  brewTimeSeconds: number,
  waterTemp: number
  resultRating: number, // 1-5 rating: Bad, Okay, Good, Excellent, Perfect
  notes: string, // User enters notes about the taste, will be used by AI
  createdOn: string
}

export default function Home() {

  const [brewLogs, setBrewLogs] = useState<Logs[]>([]);

  const getLogs = async () => {
    const response = await fetch(`${backend_port}/brewlogs/all`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: userId})
    });
    const data = await response.json();

    setBrewLogs(data);

    return data;
  }

  useEffect(() => {
    console.log("screen loaded")

    console.log(getLogs());

  }, [])

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Home" }} />
      <PageHeader title="Home" />
      <View style={styles.content}>
        <Text style={styles.subheader}>Recent Brews:</Text>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          <YStack style={styles.list}>
            {brewLogs.map((brew) => (
              <View key={brew.id} style={styles.listItem}>
                <BrewCard
                  title={brew.coffeeName}
                  description={brew.notes}
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
    paddingBottom: 40
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
