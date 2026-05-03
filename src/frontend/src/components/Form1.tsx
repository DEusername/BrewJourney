import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";

import {
  Button,
  Form,
  H4,
  Label,
  YStack,
  Input,
  TextArea,
} from "tamagui";

import Select1 from "./Select1";

export function FormsDemo() {
  const [status, setStatus] = React.useState<"off" | "submitting">("off");

  // form state
  const [method, setMethod] = React.useState("");
  const [dose, setDose] = React.useState("");
  const [ratio, setRatio] = React.useState("");
  const [grindSize, setGrindSize] = React.useState("");
  const [roastLevel, setRoastLevel] = React.useState("");
  const [coffeeType, setCoffeeType] = React.useState("");
  const [waterTarget, setWaterTarget] = React.useState("");
  const [temp, setTemp] = React.useState("");
  const [waterActual, setWaterActual] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const handleSubmit = () => {
    setStatus("submitting");

    const formData = {
      method,
      dose,
      ratio,
      grindSize,
      roastLevel,
      coffeeType,
      waterTarget,
      temp,
      waterActual,
      notes,
    };

    console.log("FORM DATA:", formData);

    setTimeout(() => setStatus("off"), 1500);
  };

  return (
    <Form
      gap="$4"
      width="100%"
      onSubmit={handleSubmit}
      borderWidth={1}
      borderColor="$borderColor"
      bg="$color2"
      p="$6"
      flex={1}
      
    >
      <H4>New Brew</H4>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <YStack gap="$3" flex={1}>

          <Label htmlFor="method">Method</Label>
          <Select1 value={method} onValueChange={setMethod} />

          <Label htmlFor="dose">Dose</Label>
          <Input
            id="dose"
            value={dose}
            onChangeText={setDose}
            placeholder="Enter the dose"
          />
          <Label htmlFor="ratio">Ratio</Label>
          <Input
            id="ratio"
            value={ratio}
            onChangeText={setRatio}
            placeholder="Enter the ratio"
          />
          <Label htmlFor="grindSize">Grind Size</Label>
          <Input
            id="grindSize"
            value={grindSize}
            onChangeText={setGrindSize}
            placeholder="Enter grind size"
          />
          <Label htmlFor="roastLevel">Roast Level</Label>
          <Input
            id="roastLevel"
            value={roastLevel}
            onChangeText={setRoastLevel}
            placeholder="Enter roast level"
          />
          <Label htmlFor="coffeeType">Coffee Type</Label>
          <Input
            id="coffeeType"
            value={coffeeType}
            onChangeText={setCoffeeType}
            placeholder="Enter coffee type"
          />
          <Label htmlFor="waterTarget">Water Target (g)</Label>
          <Input
            id="waterTarget"
            value={waterTarget}
            onChangeText={setWaterTarget}
            placeholder="Enter target water"
          />
          <Label htmlFor="temp">Temperature</Label>
          <Input
            id="temp"
            value={temp}
            onChangeText={setTemp}
            placeholder="Enter temperature"
          />
          <Label htmlFor="waterActual">Water Actual</Label>
          <Input
            id="waterActual"
            value={waterActual}
            onChangeText={setWaterActual}
            placeholder="Enter actual water"
          />
          <Label htmlFor="notes">Notes</Label>
          <TextArea
            id="notes"
            value={notes}
            onChangeText={setNotes}
            placeholder="Enter notes"
          />
        </YStack>
      </ScrollView>

      <Form.Trigger asChild>
        <Button disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Submit"}
        </Button>
      </Form.Trigger>
    </Form>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
});