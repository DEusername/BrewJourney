
import { Link, router } from 'expo-router'
import { Button, Card, H2, Image, Paragraph, XStack, YStack } from 'tamagui'

interface BrewCardProps {
  title: string
  description: string
  href: string
}

export default function BrewCard({ title, description, href }: BrewCardProps) {
  return (
    <Card width="100%" height={110} borderRadius="$4" overflow="hidden" margin={10}>
      <XStack flex={1}>
        <YStack flex={1} p="$4" gap="$3">
          <XStack justifyContent="space-between" alignItems="center">
            <H2>{title}</H2>

            <Link href={href} asChild>
              <Button onPress={() => {router.push(href)}} size="$4" borderWidth={2}>
                See Details
              </Button>
            </Link>
          </XStack>

          <Paragraph>{description}</Paragraph>
        </YStack>
      </XStack>
    </Card>
  );
}