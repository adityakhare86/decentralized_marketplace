import { Button, XStack, Text } from '@my/ui'
import { useLink } from 'solito/link'
import { ConnectButton } from '../../thirdweb'
import { client } from '../../client'
import { useActiveAccount } from 'thirdweb/react'

export function Navbar() {
  const activeAccount = useActiveAccount()
  // Implement Logic to check if the user is logged in
  const isLoggedIn = activeAccount ? true : false

  const marketLink = useLink({
    href: '/market',
  })

  const profLink = `/user/${activeAccount?.address}`
  const profileLink = useLink({
    href: profLink,
  })
  const shoplink = `/shop/${activeAccount?.address}`
  const shopLink = useLink({
    href: shoplink,
  })

  return (
    <XStack f={0.01} jc="space-between" ai="center" p="$8" width="100%" bg="black">
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
