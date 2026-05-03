import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import backend_port from "../environment";

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
  const [dose, setDose] = React.useState(0);
  const [ratio, setRatio] = React.useState("");
  const [grindSize, setGrindSize] = React.useState(0);
  const [roastLevel, setRoastLevel] = React.useState(""); // Need to setup as enum
  const [coffeeType, setCoffeeType] = React.useState("");
  const [waterTarget, setWaterTarget] = React.useState(0);
  const [temp, setTemp] = React.useState(0);
  const [waterActual, setWaterActual] = React.useState(0);
  const [notes, setNotes] = React.useState("");
  const [resultRating, setResultRating] = React.useState("");
  const [brewTimeSeconds, setBrewTimeSeconds] = React.useState("");

  const userId = 67;
  const grinderId = 12;
  const brewMethodId = 5;

  const handleSubmit = async () => {
    setStatus("submitting");

    const formData = {
      userId: userId,
      grinderId: grinderId,
      brewMethodId: brewMethodId,
      doseGrams: dose,
      targetRatio: ratio,
      grindSize: grindSize,
      roastLevel: roastLevel,
      coffeeName: coffeeType,
      targetWaterGrams: waterTarget,
      waterTemp: temp,
      actualWaterGrams: waterActual,
      brewTimeSeconds: brewTimeSeconds,
      resultRating: resultRating,
      notes: notes,
    };

    console.log("FORM DATA:", formData);

    const response = await fetch(`${backend_port}/brewlogs/create`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    })

    if (response.status == 200){
      // It worked!
      console.log("Brew log successfully added")
    } else {
      console.log("Trouble adding brew log :(")
    }

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
          <Label style={styles.subheader} htmlFor="brewTimeSeconds">
            Brew Time
          </Label>
          <Input id="brewTimeseconds" value={brewTimeSeconds} onChangeText={setBrewTimeSeconds} placeholder="Enter the brew time (seconds)"
          />
          <Label style={styles.subheader} htmlFor="resultRating">
            Result Rating
          </Label>
          <Input id="resultRating" value={resultRating} onChangeText={setResultRating} placeholder="Enter the result rating"
          />
          <Label style={styles.subheader} htmlFor="notes">
            Notes
          </Label>
          <TextArea id="notes" value={notes} onChangeText={setNotes} placeholder="Enter Notes" />
        </YStack>
      </ScrollView>

      <Form.Trigger asChild>
        <Button disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Submit!"}
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