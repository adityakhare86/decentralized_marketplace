import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  Text,
  useToastController,
  XStack,
  YStack,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/market',
  })

  return (
    <YStack f={1} height="100%" jc="space-evenly" ai="center" p="$8" gap="$4">
      <Text color="white" fontFamily="$heading" fontSize="$9" fontWeight="bold" ta="center">
        BL✦CKIFY.
      </Text>
      <YStack>
        <H1 ta="center" fontFamily="$heading" fontSize="$15" color="white" lineHeight="$15">
          A Decentralized Escrow Marketplace
        </H1>
      </YStack>

      <YStack jc="center" ai="center" p="$8" gap="$6">
        <Text
          color="white"
          shadowColor="white"
          fontSize="$8"
          fontStyle="italic"
          fontWeight="bold"
          ta="center"
        >
          Best place to sell and buy without any problem of quantity and commitments.
        </Text>
        <XStack>
          <Button size="$6" fontWeight="bold" bg="$purple8" color="black" {...linkProps}>
            Go to Market
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}
