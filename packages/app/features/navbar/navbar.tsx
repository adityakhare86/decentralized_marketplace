import { Button, XStack, Text } from '@my/ui'
import { useLink } from 'solito/link'
import { ConnectButton } from '../../thirdweb'
import { client } from '../../client'

export function Navbar() {
  // Implement Logic to check if the user is logged in
  const isLoggedIn = true

  const marketLink = useLink({
    href: '/market',
  })

  const profileLink = useLink({
    href: '/user/1',
  })

  const shopLink = useLink({
    href: '/shop/1',
  })

  return (
    <XStack f={0.01} jc="space-between" ai="center" p="$8" width="100%">
      <Text color="white" fontFamily="$heading" fontSize="$9" fontWeight="bold">
        BL✦CKIFY.
      </Text>
      <XStack f={1} jc="flex-end" pr="$6" gap="$4">
        <Button
          size="$6"
          fontWeight="bold"
          bg="black"
          color="white"
          hoverStyle={{
            backgroundColor: 'black',
            bordered: false,
          }}
          pressStyle={{ backgroundColor: 'black', bordered: false }}
          {...marketLink}
        >
          Market
        </Button>
        {isLoggedIn && (
          <>
            <Button
              size="$6"
              fontWeight="bold"
              bg="black"
              color="white"
              hoverStyle={{
                backgroundColor: 'black',
                bordered: false,
              }}
              pressStyle={{ backgroundColor: 'black', bordered: false }}
              {...profileLink}
            >
              Profile
            </Button>
            <Button
              size="$6"
              fontWeight="bold"
              bg="black"
              color="white"
              hoverStyle={{
                backgroundColor: 'black',
                bordered: false,
              }}
              pressStyle={{ backgroundColor: 'black', bordered: false }}
              {...shopLink}
            >
              My Shop
            </Button>
          </>
        )}
      </XStack>
      <ConnectButton client={client} />
    </XStack>
  )
}
