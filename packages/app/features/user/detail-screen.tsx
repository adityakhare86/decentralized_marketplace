import React from 'react'
import { YStack, XStack, Text, Card, Button, Image, H1, SizableText, Separator, Tabs } from '@my/ui'
import { Navbar } from '../navbar/navbar'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { SeparatorVertical } from '@tamagui/lucide-icons'
import TransactionCard from '../transaction-card/transaction-card'
import OrderCard from '../order-card/order-card'

interface Transaction {
  transactionId: string
  productId: string
  buyerId: string
  status: number
  volume: number
  date: string
}

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  var [id] = useParam('id')
  const link = useLink({
    href: '/',
  })

  // Logic to check if user is checking his own profile
  const isProfileOwner = true

  const pfp: string[] = [
    'https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622024.jpg',
    'https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg',
    'https://openseauserdata.com/files/da557f9b4e792bf839fd9f4401363ea3.png',
    'https://cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg',
    'https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149629594.jpg?size=626&ext=jpg&ga=GA1.1.570113244.1713877718&semt=sph',
    'https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622052.jpg?w=826&t=st=1714676077~exp=1714676677~hmac=98697ee4a0f84687cacc4b8e4e8c217aefbc6c32e46178672f910234ab602cc4',
  ]

  function hashStringToNumber(id: string): number {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash
  }

  function assignProfileImageUri(id: string): string {
    const hash = hashStringToNumber(id)
    const index = Math.abs(hash) % pfp.length
    return pfp[index]
  }
  // Dummy transaction data
  const transactions = [
    {
      transactionId: 'T001',
      productId: 'P001',
      buyerId: 'B001',
      status: 0,
      volume: 0.03,
      date: '23/04/2024',
    },
    {
      transactionId: 'T002',
      productId: 'P002',
      buyerId: 'B002',
      status: 1,
      volume: 0.03,
      date: '23/04/2024',
    },
    {
      transactionId: 'T003',
      productId: 'P003',
      buyerId: 'B003',
      status: 2,
      volume: 0.03,
      date: '23/04/2024',
    },
    {
      transactionId: 'T001',
      productId: 'P001',
      buyerId: 'B001',
      status: 0,
      volume: 0.03,
      date: '21/04/2024',
    },
    {
      transactionId: 'T002',
      productId: 'P002',
      buyerId: 'B002',
      status: 1,
      volume: 0.03,
      date: '21/04/2024',
    },
    {
      transactionId: 'T003',
      productId: 'P003',
      buyerId: 'B003',
      status: 2,
      volume: 0.03,
      date: '20/04/2024',
    },
    {
      transactionId: 'T003',
      productId: 'P003',
      buyerId: 'B003',
      status: 2,
      volume: 0.03,
      date: '20/04/2024',
    },
    {
      transactionId: 'T001',
      productId: 'P001',
      buyerId: 'B001',
      status: 0,
      volume: 0.03,
      date: '20/04/2024',
    },
  ]
  if (!id) {
    id = '143224'
  }
  const imageUri = assignProfileImageUri(id)

  return (
    <YStack f={1} jc="flex-start" ai="center" gap="$4" bg="black">
      <Navbar />
      <Separator />
      <XStack f={2} ai="flex-start" jc="flex-start" gap="$4">
        <YStack jc="center" ai="center" gap="$4">
          <Image
            resizeMode="contain"
            alignSelf="center"
            borderRadius="$8"
            source={{ uri: imageUri }}
            width={400}
            height={400}
          />
          <Separator />
          <Text fontSize="$8" color="white">
            {id}
          </Text>
          <Separator />
          <Text fontSize="$8" color="white">
            🟢 : Delivered {'\n'}🔴 : Cancelled{'\n'}⚪ : Pending
          </Text>
        </YStack>
        <SeparatorVertical />

        <YStack f={2} jc="flex-start" ai="flex-start" gap="$4">
          <Tabs
            defaultValue="tab1"
            orientation="horizontal"
            flexDirection="column"
            borderRadius="$4"
            overflow="hidden"
            backgroundColor="black"
            themeInverse
            pressStyle={{ backgroundColor: 'black' }}
          >
            <Tabs.List>
              <Tabs.Tab
                flex={1}
                value="tab1"
                bg="black"
                hoverStyle={{ backgroundColor: 'black' }}
                pressStyle={{ backgroundColor: 'black' }}
              >
                <Text fontSize="$8" color="white" fow="600">
                  Recent Transactions
                </Text>
              </Tabs.Tab>
              {isProfileOwner && (
                <Tabs.Tab
                  flex={1}
                  value="tab2"
                  bg="black"
                  hoverStyle={{ backgroundColor: 'black' }}
                >
                  <Text fontSize="$8" fow="600" color="white">
                    My Orders ✦
                  </Text>
                </Tabs.Tab>
              )}
            </Tabs.List>
            <Tabs.Content value="tab1" gap="$4" p="$4">
              <Separator />
              {transactions.map((transaction) => (
                <TransactionCard key={transaction.transactionId} transaction={transaction} />
              ))}
            </Tabs.Content>

            <Tabs.Content value="tab2" gap="$4" p="$4">
              <Separator />
              {transactions.map((transaction) => (
                <OrderCard key={transaction.transactionId} transaction={transaction} />
              ))}
            </Tabs.Content>
          </Tabs>
        </YStack>
      </XStack>
      <Separator />
    </YStack>
  )
}
