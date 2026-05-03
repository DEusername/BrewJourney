import { createContext } from "react";
import { PortalProvider, TamaguiProvider } from "tamagui";
import tamaguiConfig from "../../tamagui.config";
import { Tabs } from "expo-router";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";


export interface BrewItem {
  // temp type for brew
  id: string;
  title: string;
  description: string;
  roast?: string;
}

const brewList: BrewItem[] = [
  // Sample brew items
  {
    id: "1",
    title: "Morning Espresso",
    description: "★ ★ ★ ☆ ☆ - 5/1/26",
    roast: "Dark",
  },
  {
    id: "2",
    title: "Citrus Pour Over",
    description: "★ ★ ★ ★ ☆ - 4/20/26",
    roast: "Light",
  },
  {
    id: "7",
    title: "Citrus Pour Over",
    description: "★ ★ ★ ★ ☆ - 4/20/26",
    roast: "Light",
  },
  {
    id: "12",
    title: "Citrus Pour Over",
    description: "★ ★ ★ ★ ☆ - 4/20/26",
    roast: "Light",
  },
  {
    id: "3",
    title: "Iced Brew",
    description: "Smooth cold brew with creamy vanilla finish.",
    roast: "Medium",
  },
  {
    id: "4",
    title: "Iced Brew",
    description: "Smooth cold brew with creamy vanilla finish.",
    roast: "Medium",
  },
  {
    id: "5",
    title: "Iced Brew",
    description: "Smooth cold brew with creamy vanilla finish.",
    roast: "Medium",
  },
  {
    id: "6",
    title: "Iced Brew",
    description: "Smooth cold brew with creamy vanilla finish.",
    roast: "Medium",
  },
];

export const BrewListContext = createContext<BrewItem[]>(brewList);



export default function TabLayout() {// Provide brew list to the app, also set up the tab navigation structure
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <BrewListContext.Provider value={brewList}>
          <Tabs
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} /> ) }} />
          <Tabs.Screen name="addABrew" options={{ title: "Add a Brew" }} />
          <Tabs.Screen name="chat" options={{ title: "Barista Chat" }} />
          <Tabs.Screen name="data" options={{ title: "My Data" }} />
        </Tabs>
        </BrewListContext.Provider>
    </TamaguiProvider>
    
  );
}
