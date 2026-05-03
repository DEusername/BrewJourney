import { router } from "expo-router";
import { Button, styled } from "tamagui";

const BackBtnStyle = styled(Button, {
  backgroundColor: "#411515be",
  borderRadius: "$2",
  justifyContent: "flex-start",
});

//tamagui btn
export function BackButton() {
  return <BackBtnStyle onPress={() => router.back()}>Back</BackBtnStyle>;
}
