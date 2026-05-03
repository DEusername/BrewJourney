import { createContext } from 'react';
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../../tamagui.config';

export interface BrewItem {// temp type for brew
  id: string;
  title: string;
  description: string;
  roast?: string;
}

const brewList: BrewItem[] = [// Sample brew items
  {
    id: '1',
    title: 'Morning Espresso',
    description: 'Dark roast with notes of chocolate and caramel.',
    roast: 'Dark',
  },
  {
    id: '2',
    title: 'Citrus Pour Over',
    description: 'Bright Kenya bean with citrus and floral aroma.',
    roast: 'Light',
  },
  {
    id: '3',
    title: 'Iced Brew',
    description: 'Smooth cold brew with creamy vanilla finish.',
    roast: 'Medium',
  },
];

export const BrewListContext = createContext<BrewItem[]>(brewList);

export default function TabLayout() {// Provide brew list to the app, also set up the tab navigation structure
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <BrewListContext.Provider value={brewList}>
        <NativeTabs>
          <NativeTabs.Trigger name="home">
            <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="addABrew">
            <NativeTabs.Trigger.Icon sf="plus.circle" md="add" />
            <NativeTabs.Trigger.Label>Add a Brew</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="chat">
            <NativeTabs.Trigger.Icon sf="person" md="details" />
            <NativeTabs.Trigger.Label>Barrista Chat</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="data">
            <NativeTabs.Trigger.Icon sf="person" md="details" />
            <NativeTabs.Trigger.Label>My Data</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
        </NativeTabs>
      </BrewListContext.Provider>
    </TamaguiProvider>
  );
}
