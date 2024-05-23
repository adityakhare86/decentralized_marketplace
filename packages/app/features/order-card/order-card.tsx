import React from 'react'
import { YStack, Button, XStack, Text, Card } from '@my/ui'
import { Check, X } from '@tamagui/lucide-icons'
import { hexToNumber } from 'thirdweb'
import { prepareContractCall, sendTransaction, resolveMethod, numberToHex } from 'thirdweb'
import { contract } from '../../contract'
import { useActiveAccount } from 'thirdweb/react'

interface Order {
  orderId: `0x${string}`
  productId: `0x${string}`
  status: number
  amountPaid: `0x${string}`
  quantity: `0x${string}`
  seller: string
}

export function OrderCard({ order }: { order: Order }) {
  const { orderId, seller, productId, status, amountPaid, quantity } = order
  const account = useActiveAccount()!
  const getCardColor = (status: number) => {
    switch (status) {
      case 0:
        return 'white'
      case 1:
        return '$red10'
      case 2:
        return '$green10'
      default:
        return 'gray'
    }
  }

  async function handleAccept(account, _orderId) {
    const transaction = await prepareContractCall({
      contract,
      method: 'acceptOrder',
      params: [_orderId],
    })
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    })
    // if (transactionHash) {
    //   alert(`Verificaton hash : {\n}Verify here : ${transactionHash}`)
    // }
  }

  async function handleCancel(account, _orderId) {
    const transaction = await prepareContractCall({
      contract,
      method: 'cancelOrder',
      params: [_orderId],
    })
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    })
    // if (transactionHash) {
    //   alert(`Order Cancelled : {\n}Verificaton hash : ${transactionHash}`)
    // }
  }

  return (
    <Card
      size="$4"
      width={900}
      height={100}
      bg={getCardColor(status)}
      padding="$4"
      borderRadius="$8"
    >
      <XStack ai="center" jc="space-between">
        <YStack>
          <Text fontSize="$6" color="black" fow="700">
            Order ID: {hexToNumber(orderId)}
          </Text>
          <Text fontSize="$6" color="black" fow="700">
            Seller: {seller}
          </Text>
          <Text fontSize="$6" color="black" fow="700">
            Product ID: {hexToNumber(productId)}
          </Text>
        </YStack>
        <Text fontSize="$6" color="black">
          Q: {hexToNumber(quantity)}
        </Text>
        <Text fos="$7" fow="700" color="black">
          {hexToNumber(amountPaid)} ETH
        </Text>
        {!status ? (
          <XStack gap="$4">
            <Button
              circular
              fontWeight="bold"
              icon={Check}
              scaleIcon={2.5}
              size="$5"
              color="white"
              onPress={() => handleAccept(account, orderId)}
              bg="$green10"
              hoverStyle={{
                backgroundColor: '$green10',
              }}
              pressStyle={{
                backgroundColor: '$green7',
              }}
            />
            <Button
              circular
              fontWeight="bold"
              icon={X}
              scaleIcon={2.5}
              size="$5"
              color="white"
              onPress={() => handleCancel(account, orderId)}
              bg="red"
              hoverStyle={{
                backgroundColor: 'red',
              }}
              pressStyle={{
                backgroundColor: '$red7',
              }}
            />
          </XStack>
        ) : null}
      </XStack>
    </Card>
  )
}

export default OrderCard
