import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 37,
    paddingBottom: 7,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  title: {
    fontSize: 27,
    color: "#0",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginTop: 4,
  },
});
