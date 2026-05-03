import { Link } from "expo-router";
import { Button, Card, H2, Image, Paragraph, XStack, YStack } from "tamagui";
import { styled } from "tamagui";

interface BrewCardProps {
  title: string;
  description: string;
  href: string;
}

//use tamagui api to write css styling which is compiled into a react native stylesheet at runtime.
const StyledCard = styled(Card, {
  width: "100%",
  height: 70,
  borderRadius: "$25",
  overflow: "hidden",
  margin: 5,
  borderColor: "green",
  backgroundColor: "#99ba90", // Or "$blue1", "white", etc.
});

const StyledH2 = styled(H2, {
  size: "$7",
  color: "black",
});

const CardSubheading = styled(Paragraph, {
  size: "$3",
  color: "#411515be",
});

export default function BrewCard({ title, description, href }: BrewCardProps) {
  return (
    <StyledCard>
      <XStack flex={1}>
        <YStack flex={1} p="$3">
          <StyledH2>{title}</StyledH2>
          <CardSubheading>{description}</CardSubheading>
        </YStack>
        <YStack justifyContent="center" p="$3">
          <Link href={"/details/1"} asChild>
            <Button size="$2.5" borderWidth={2}>
              Details
            </Button>
          </Link>
        </YStack>
      </XStack>
    </StyledCard>
  );
}
