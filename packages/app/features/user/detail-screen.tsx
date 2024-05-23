import React from 'react'
import { YStack, XStack, Text, Card, Button, Image, H1, SizableText, Separator, Tabs } from '@my/ui'
import { Navbar } from '../navbar/navbar'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { SeparatorVertical } from '@tamagui/lucide-icons'
import { TransactionCard } from '../transaction-card/transaction-card'
import OrderCard from '../order-card/order-card'
import { hexToNumber, readContract, resolveMethod } from 'thirdweb'
import { useState, useEffect } from 'react'
import { contract } from '../../contract'
import { useActiveAccount, useReadContract } from 'thirdweb/react'
import { TransactionOwnerCard } from '../transaction-owner-card/transaction-owner-card'

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
  var [id] = useParam('id') as unknown as string
  const link = useLink({
    href: '/',
  })
  const activeAccount = useActiveAccount()!

  // Logic to check if user is checking his own profile
  const isProfileOwner = activeAccount?.address === id ? true : false

  const [recentTx, setRecentTx] = useState<any>([])

  useEffect(() => {
    async function fetchRecentTx() {
      try {
        const transactions = await readContract({
          contract: contract,
          method: 'getRecentTx',
          params: [id],
        })
        setRecentTx(transactions)
      } catch (error) {
        console.error('Error fetching recent transactions : ', error)
      }
    }

    fetchRecentTx()
  }, [activeAccount])
  console.log(recentTx)

  const [myOrders, setmyOrders] = useState<any>([])

  useEffect(() => {
    async function fetchMyOrders() {
      try {
        const orders = await readContract({
          contract: contract,
          method: 'getOrders',
          params: [activeAccount?.address],
        })
        setmyOrders(orders)
      } catch (error) {
        console.error('Error fetching orders : ', error)
      }
    }

    fetchMyOrders()
  }, [activeAccount])
  console.log(myOrders)

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
              {isProfileOwner
                ? recentTx
                    ?.slice()
                    .reverse()
                    .map((tx) => <TransactionOwnerCard key={tx.orderId} transaction={tx} />)
                : recentTx
                    ?.slice()
                    .reverse()
                    .map((tx) => <TransactionCard key={tx.orderId} transaction={tx} />)}
            </Tabs.Content>

            <Tabs.Content value="tab2" gap="$4" p="$4">
              <Separator />
              {myOrders
                ?.slice()
                .reverse()
                .map((order) => (
                  <OrderCard key={order.orderId} order={order} />
                ))}
            </Tabs.Content>
          </Tabs>
        </YStack>
      </XStack>
      <Separator />
    </YStack>
  )
}
