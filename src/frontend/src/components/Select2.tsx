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
  { label: "Grinder", value: "gru" },
  { label: "geinder2 ", value: "frty" },
  { label: "grinder3", value: "moceryha" },
];

const userId = 67;

export default function Select1({ value, onValueChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([{label: "", value: ""}])

  const fetchOptions = async () => {
    const response = await fetch(`${backend_port}/grinders/findgrinder`,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: userId})
    });
    const data = await response.json();

    const myArray = [{
      label: data.grinderName,
      value: data.id
    }]

    setOptions(myArray);
  }

  React.useEffect(() => {

    fetchOptions();

  }, [])

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? "Choose a grinder...";

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