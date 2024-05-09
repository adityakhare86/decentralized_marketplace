import { YStack, XStack, H1, Text, Separator } from '@my/ui'
import { Navbar } from '../navbar/navbar'

export function LoadingScreen() {
  return (
    <>
      <Navbar />
      <YStack f={1} jc="center" ai="center" gap="$4" bg="black">
        <Separator />
        <H1 color="white">Loading ...</H1>
      </YStack>
    </>
  )
}
