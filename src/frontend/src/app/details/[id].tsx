import PageHeader from "../../components/PageHeader";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
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
    TamaguiProvider,
} from "tamagui";

//**Overarching styles**
const PageContainer = styled(YStack, {
    flex: 1,
});

const ContentStack = styled(YStack, {
    flex: 1,
    justifyContent: "flex-start",
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
    backgroundColor: "#a4966c",
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
    height: "$5",
    pressStyle: {
        opacity: 0.8,
        scale: 0.98,
    },
});

const StyledCardHeader = styled(Card.Header, {
    padding: "$3",
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
    const params = useLocalSearchParams();
    const brew = JSON.parse(params.brewLog); // If error, ignore

    useEffect(() => {
        console.log(brew);
    }, []);

    return (
        <TamaguiProvider>
            <PageContainer>
                <Stack.Screen options={{ title: "Brew Details" }} />
                <PageHeader title={`Brew Detail`} />
                <TopHeading>{brew.brewMethod.methodName} - {formatDate(brew.createdOn)}</TopHeading>      <SubHeading>{renderStars(brew.resultRating)}</SubHeading>
                <ContentStack>
                    <CenterRow>
                        <StyledCardMed>
                            <StyledCardHeader>
                                <YStack>
                                    <FieldRow>
                                        <YStack flex={1} justifyContent="center" alignItems="center">
                                            <Text color="black" fontWeight="bold" fontSize="$5">
                                                Dose:
                                            </Text>
                                            <Text color="black" fontWeight="normal" fontSize="$5">
                                                {brew.doseGrams}g
                                            </Text>
                                        </YStack>
                                        <YStack flex={1} justifyContent="center" alignItems="center">
                                            <Text color="black" fontWeight="bold" fontSize="$5">
                                                Ratio:
                                            </Text>
                                            <Text color="black" fontWeight="normal" fontSize="$5">
                                                {brew.targetRatio}
                                            </Text>
                                        </YStack>
                                        <YStack flex={1} justifyContent="center" alignItems="center">
                                            <Text color="black" fontWeight="bold" fontSize="$5">
                                                Grind Size:
                                            </Text>
                                            <Text color="black" fontWeight="normal" fontSize="$5">
                                                {brew.grindSize}
                                            </Text>
                                        </YStack>
                                    </FieldRow>
                                    <FieldRow>
                                        <YStack flex={1} justifyContent="center" alignItems="center">
                                            <Text color="black" fontWeight="bold" fontSize="$5">
                                                Roast-Level:
                                            </Text>
                                            <Text color="black" fontWeight="normal" fontSize="$5">
                                                {brew.roastLevel}
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
                                                {brew.coffeeName}
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
                                                {brew.targetWaterGrams}g
                                            </Text>
                                        </YStack>
                                        <YStack alignItems="center">
                                            <Text color="black" fontWeight="bold" fontSize="$5">
                                                Temp:
                                            </Text>
                                            <Text color="black" fontWeight="normal" fontSize="$5">
                                                {brew.waterTemp}F
                                            </Text>
                                        </YStack>
                                        <YStack flex={1} justifyContent="center" alignItems="center">
                                            <Text color="black" fontWeight="bold" fontSize="$5">
                                                Water Actual:
                                            </Text>
                                            <Text color="black" fontWeight="normal" fontSize="$5">
                                                {brew.actualWaterGrams}g
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
                                <H2 fontSize={"$8"}>Notes:</H2>
                                <Paragraph>{brew.notes}</Paragraph>
                            </StyledCardHeader>
                        </StyledCardLarge>
                    </CenterRow>
                    <CenterRow>
                        <StyledCardSmall
                            borderWidth={"$1"}
                            borderColor={"#1f336b"}
                            onPress={() => console.log("Talking to Brewy...")} //FIXME
                        >
                            <H3
                                fontStyle="italic"
                                fontWeight={"normal"}
                                fontSize={"$5"}
                                textAlign="center"
                                paddingTop="$2"
                            >
                                Talk to Brewy about this?
                            </H3>
                        </StyledCardSmall>
                    </CenterRow>
                </ContentStack>
            </PageContainer>
        </TamaguiProvider>
    );
}
