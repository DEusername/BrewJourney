import React from "react";
import {
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
} from "react-native";
import backend_port from "../environment";

type Props = {
  value: string;
  onValueChange: (val: string) => void;
};

const options = [
  { label: "Latte", value: "latte" },
  { label: "Espresso", value: "espresso" },
  { label: "Mocha", value: "mocha" },
];

export default function Select1({ value, onValueChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([{label: "", value: ""}])
  
  const fetchOptions = async () => {
    const response = await fetch(`${backend_port}/brewmethods/all`);
    const data = await response.json();

    const myArray = data.map(item => ({ // if error, ignore
        label: item.methodName,
        value: item.id
    }));

    console.log(myArray);

    setOptions(myArray);
  }

  React.useEffect(() => {

    fetchOptions();

  }, [])

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? "Choose a drink...";

  return (
    <>
      <Pressable style={styles.trigger} onPress={() => setOpen(true)}>
        <Text style={styles.triggerText}>{selectedLabel}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            {options.map((opt) => (
              <Pressable
                key={opt.value}
                style={styles.option}
                onPress={() => {
                  console.log(opt.value)
                  onValueChange(opt.value);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>{opt.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  triggerText: {
    fontSize: 16,
  },
  backdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
  },
  sheet: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
  },
  option: {
    padding: 14,
  },
  optionText: {
    fontSize: 16,
  },
});