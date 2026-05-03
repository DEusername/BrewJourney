
import { Link, router } from 'expo-router'
import { Button, Card, H2, Image, Paragraph, styled, XStack, YStack } from 'tamagui'

interface BrewCardProps {
  title: string;
  description: string;
  href: string;
  brew: Logs;
  rating: number;
}

interface Logs { 
  id: number,
  userId: number,
  grinderId: number,
  brewMethodId: number,
  coffeeName: string,
  roastLevel: number, // 1-5: Light, Medium-Light, Medium, Medium-Dark, Dark
  targetRatio: string, // coffee:water ratio (in grams)
  doseGrams: number, // Grams are usually measured in whole numbers, right? Rarely have half a gram
  targetWaterGrams: number, // Recommended water grams for the method/grounds, auto-calculated and stored in the brew log
  actualWaterGrams: number, // User inputted, weighed after the coffee is made
  grindSize: number, // Number used on grinder?
  brewTimeSeconds: number,
  waterTemp: number
  resultRating: number, // 1-5 rating: Bad, Okay, Good, Excellent, Perfect
  notes: string, // User enters notes about the taste, will be used by AI
  createdOn: string
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

const renderStars = (rating: number) => {
  const filled = "★".repeat(rating);
  const hollow = "☆".repeat(5 - rating);
  return filled + hollow;
};


export default function BrewCard({title, description, rating, href, brew}: BrewCardProps) {
  return (
    <StyledCard>
      <XStack flex={1}>
        <YStack flex={1} p="$3">
          <StyledH2>{title}</StyledH2>
          <CardSubheading>{renderStars(rating)} - {brew.createdOn.split("T")[0]}</CardSubheading>
        </YStack>
        <YStack justifyContent="center" p="$3">
          <Link href={
            {pathname: href, 
            params: {brewLog : JSON.stringify(brew)}
            }} asChild>
            <Button size="$2.5" borderWidth={2}>
              Details
            </Button>
          </Link>
        </YStack>
      </XStack>
    </StyledCard>
  );
}
