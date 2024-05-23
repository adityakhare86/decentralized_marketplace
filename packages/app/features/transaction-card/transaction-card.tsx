import React from 'react'
import { YStack, XStack, Text, Card } from '@my/ui'
import { hexToNumber } from 'thirdweb'

interface Transaction {
  orderId: `0x${string}`
  productId: `0x${string}`
  buyer: string
  status: number
  amountPaid: `0x${string}`
  quantity: `0x${string}`
}

interface TransactionCardProps {
  transaction: Transaction
}

export function TransactionCard({ transaction }: { transaction: Transaction }) {
  const { orderId, productId, status, amountPaid, quantity } = transaction

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
            Product ID: {hexToNumber(productId)}
          </Text>
          <Text fontSize="$6" color="black">
            Quantity: {hexToNumber(quantity)}
          </Text>
        </YStack>
        <Text fos="$7" fow="700" color="black">
          {hexToNumber(amountPaid)} ETH
        </Text>
      </XStack>
    </Card>
  )
}
