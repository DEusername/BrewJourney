import PageHeader from "../../components/PageHeader";
import { Stack, useLocalSearchParams } from "expo-router";
import { BackButton } from "../../components/BackButton";
import { Card, XStack, YStack, H2, Paragraph, styled } from "tamagui";

const PageContainer = styled(YStack, {
  flex: 1,
});

const ContentStack = styled(YStack, {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: "$3",
  gap: "$3",
});

const CenterRow = styled(XStack, {
  width: "100%",
  justifyContent: "center",
});

const FooterRow = styled(XStack, {
  width: "100%",
  justifyContent: "flex-start",
  padding: "$3",
});

const StyledCard = styled(Card, {
  size: "$4",
  borderWidth: 1,
  width: "100%",
});

const StyledCardHeader = styled(Card.Header, {
  padding: "$4",
});

export default function ID() {
  const { id } = useLocalSearchParams();

  return (
    <PageContainer>
      <Stack.Screen options={{ title: "Brew Details" }} />
      <PageHeader title={`Brew Detail:`} />
      <ContentStack>
        <CenterRow>
          <StyledCard>
            <StyledCardHeader>
              <H2>Coffee Stuffs</H2>
              <Paragraph>Now available</Paragraph>
            </StyledCardHeader>
          </StyledCard>
        </CenterRow>
        <CenterRow>
          <StyledCard>
            <StyledCardHeader>
              <H2>Water Stuffs</H2>
              <Paragraph>Now available</Paragraph>
            </StyledCardHeader>
          </StyledCard>
        </CenterRow>
        <CenterRow>
          <StyledCard>
            <StyledCardHeader>
              <H2>Notes:</H2>
              <Paragraph>Now available</Paragraph>
            </StyledCardHeader>
          </StyledCard>
        </CenterRow>
        <CenterRow>
          <StyledCard>
            <StyledCardHeader>
              <H2>Talk to AI</H2>
              <Paragraph>Now available</Paragraph>
            </StyledCardHeader>
          </StyledCard>
        </CenterRow>
      </ContentStack>
      <FooterRow>
        <BackButton />
      </FooterRow>
    </PageContainer>
  );
}
