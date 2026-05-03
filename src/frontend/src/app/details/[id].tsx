import PageHeader from "../../components/PageHeader";
import { Stack, useLocalSearchParams } from "expo-router";
import { BackButton } from "../../components/BackButton";
import {
  Card,
  XStack,
  YStack,
  H2,
  H3,
  Paragraph,
  styled,
  H1,
  Text,
} from "tamagui";

//**Overarching styles**
const PageContainer = styled(YStack, {
  flex: 1,
});

const ContentStack = styled(YStack, {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: "$3",
  gap: "$2",
});

//**Bubble Section Styles**
const CenterRow = styled(XStack, {
  width: "100%",
  justifyContent: "center",
});

const FooterRow = styled(XStack, {
  width: "100%",
  justifyContent: "flex-start",
  padding: "$3",
});

const StyledCardLarge = styled(Card, {
  size: "$4",
  borderWidth: 1,
  width: "102%",
  backgroundColor: "#99ba90",
});

const StyledCardMed = styled(Card, {
  borderWidth: 1,
  width: "102%",
  backgroundColor: "#99ba90",
  height: "$11",
});

const StyledCardMedAlt = styled(Card, {
  borderWidth: 1,
  width: "102%",
  backgroundColor: "#bfa26c",
  height: "$8",
});

const StyledCardSmall = styled(Card, {
  borderWidth: 1,
  borderRadius: "$10",
  width: "102%",
  backgroundColor: "#68afd0",
  height: "$4",
});

const StyledCardHeader = styled(Card.Header, {
  padding: "$3",
});

//each subsection of each card
const InnerCardField = styled(Text, {
  color: "black",
  paddingTop: "$0",
  paddingBottom: "$2",
  fontWeight: "bold",
  fontSize: "$5",
  flex: 1,
  textAlign: "center",
});

//the x-directional row of each card
const FieldRow = styled(XStack, {
  width: "100%",
  justifyContent: "space-between",
  gap: "$3",
});

//** Headings **
const TopHeading = styled(H3, {
  paddingTop: "$4",
  textAlign: "center",
});

const SubHeading = styled(H3, {
  padding: "$0",
  textAlign: "center",
  color: "darkgreen",
});

const renderStars = (rating: number) => {
  const filled = "★".repeat(rating);
  const hollow = "☆".repeat(5 - rating);
  return filled + hollow;
};

export default function ID() {
  const { id } = useLocalSearchParams();

  //TODO, rep with actual rating from server
  const rating = 1;

  return (
    <PageContainer>
      <Stack.Screen options={{ title: "Brew Details" }} />
      <PageHeader title={`Brew Detail`} />
      <TopHeading>French Press - 05/01/26</TopHeading>
      <SubHeading>{renderStars(rating)}</SubHeading>
      <ContentStack>
        <CenterRow>
          <StyledCardMed marginTop={"$-10"}>
            <StyledCardHeader>
              <YStack>
                <FieldRow>
                  <YStack flex={1} justifyContent="center" alignItems="center">
                    <Text color="black" fontWeight="bold" fontSize="$5">
                      Dose:
                    </Text>
                    <Text color="black" fontWeight="normal" fontSize="$5">
                      18g
                    </Text>
                  </YStack>
                  <YStack flex={1} justifyContent="center" alignItems="center">
                    <Text color="black" fontWeight="bold" fontSize="$5">
                      Ratio:
                    </Text>
                    <Text color="black" fontWeight="normal" fontSize="$5">
                      1:15
                    </Text>
                  </YStack>
                  <YStack flex={1} justifyContent="center" alignItems="center">
                    <Text color="black" fontWeight="bold" fontSize="$5">
                      Grind Size:
                    </Text>
                    <Text color="black" fontWeight="normal" fontSize="$5">
                      Medium
                    </Text>
                  </YStack>
                </FieldRow>
                <FieldRow>
                  <YStack flex={1} justifyContent="center" alignItems="center">
                    <Text color="black" fontWeight="bold" fontSize="$5">
                      Roast-Level:
                    </Text>
                    <Text color="black" fontWeight="normal" fontSize="$5">
                      Dark
                    </Text>
                  </YStack>
                  <YStack
                    padding="$2.5"
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text color="black" fontWeight="bold" fontSize="$5">
                      Coffee:
                    </Text>
                    <Text color="black" fontWeight="normal" fontSize="$5">
                      Peet's Palace
                    </Text>
                  </YStack>
                </FieldRow>
              </YStack>
            </StyledCardHeader>
          </StyledCardMed>
        </CenterRow>

        <CenterRow>
          <StyledCardMedAlt>
            <StyledCardHeader>
              <YStack>
                <FieldRow>
                  <YStack flex={1} justifyContent="center" alignItems="center">
                    <Text color="black" fontWeight="bold" fontSize="$5">
                      Water Target:
                    </Text>
                    <Text color="black" fontWeight="normal" fontSize="$5">
                      340g
                    </Text>
                  </YStack>
                  <YStack alignItems="center">
                    <Text color="black" fontWeight="bold" fontSize="$5">
                      Temp:
                    </Text>
                    <Text color="black" fontWeight="normal" fontSize="$5">
                      195F
                    </Text>
                  </YStack>
                  <YStack flex={1} justifyContent="center" alignItems="center">
                    <Text color="black" fontWeight="bold" fontSize="$5">
                      Water Actual:
                    </Text>
                    <Text color="black" fontWeight="normal" fontSize="$5">
                      355g
                    </Text>
                  </YStack>
                </FieldRow>
              </YStack>
            </StyledCardHeader>
          </StyledCardMedAlt>
        </CenterRow>
        <CenterRow>
          <StyledCardLarge>
            <StyledCardHeader>
              <H2>Notes:</H2>
              <Paragraph>Now available</Paragraph>
            </StyledCardHeader>
          </StyledCardLarge>
        </CenterRow>
        <CenterRow>
          <StyledCardSmall>
            <StyledCardHeader>
              <H2>Talk to AI</H2>
              <Paragraph>Now available</Paragraph>
            </StyledCardHeader>
          </StyledCardSmall>
        </CenterRow>
      </ContentStack>
      <FooterRow>
        <BackButton />
      </FooterRow>
    </PageContainer>
  );
}
