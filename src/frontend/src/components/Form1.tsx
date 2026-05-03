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
import Select2 from "./Select2";

export function FormsDemo() {
  const [status, setStatus] = React.useState<"off" | "submitting">("off");

  const [method, setMethod] = React.useState("");
  const [grinder, setGrinder] = React.useState("");
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
      <H4 fontSize={30}>New Brew</H4>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <YStack gap="$3" flex={1}>

          <Label style={styles.subheader} htmlFor="method">
            Method
          </Label>
          <Select1 value={method} onValueChange={setMethod} />

          <Label style={styles.subheader} htmlFor="grinder">
            Grinder
          </Label>
          <Select2 value={grinder} onValueChange={setGrinder} />

          <Label style={styles.subheader} htmlFor="dose">
            Dose
          </Label>
          <Input id="dose" value={dose} onChangeText={setDose} placeholder="Enter the dose"
          />
          <Label style={styles.subheader} htmlFor="ratio">
            Ratio
          </Label>
          <Input id="ratio" value={ratio} onChangeText={setRatio} placeholder="Enter the ratio"
          />
          <Label style={styles.subheader} htmlFor="grindSize">
            Grind Size
          </Label>
          <Input id="grindSize" value={grindSize} onChangeText={setGrindSize} placeholder="Enter grind size"
          />
          <Label style={styles.subheader} htmlFor="roastLevel">
            Roast Level
          </Label>
          <Input id="roastLevel" value={roastLevel} onChangeText={setRoastLevel} placeholder="Enter roast level"
          />
          <Label style={styles.subheader} htmlFor="coffeeType">
            Coffee Type
          </Label>
          <Input id="coffeeType" value={coffeeType} onChangeText={setCoffeeType} placeholder="Enter coffee type"
          />
          <Label style={styles.subheader} htmlFor="waterTarget">
            Water Target (g)
          </Label>
          <Input id="waterTarget" value={waterTarget} onChangeText={setWaterTarget} placeholder="Enter target water"
          />
          <Label style={styles.subheader} htmlFor="temp">
            Temperature
          </Label>
          <Input id="temp" value={temp} onChangeText={setTemp} placeholder="Enter temperature"
          />
          <Label style={styles.subheader} htmlFor="waterActual">
            Water Actual
          </Label>
          <Input id="waterActual" value={waterActual} onChangeText={setWaterActual} placeholder="Enter actual water"
          />
          <Label style={styles.subheader} htmlFor="notes">
            Notes
          </Label>
          <TextArea id="notes" value={notes} onChangeText={setNotes} placeholder="Enter Notes" />
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
  subheader: {
    justifyContent: "flex-start",
    color: "black",
    fontSize: 20,
    paddingTop: 1,
    height: 35
  },
});