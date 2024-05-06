import React from 'react'
import { YStack, XStack, Text, Card } from '@my/ui'

interface Transaction {
  transactionId: string
  productId: string
  buyerId: string
  status: number
  volume: number
  date: string
}

interface TransactionCardProps {
  transaction: Transaction
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const getCardColor = (status: number) => {
    switch (status) {
      case 0:
        return 'white'
      case 1:
        return '$green10'
      case 2:
        return '$red10'
      default:
        return 'gray'
    }
  }

  return (
    <Card
      size="$4"
      width={900}
      height={100}
      bg={getCardColor(transaction.status)}
      padding="$4"
      borderRadius="$8"
    >
      <XStack ai="center" jc="space-between">
        <YStack>
          <Text fontSize="$6" color="black" fow="700">
            Transaction ID: {transaction.transactionId}
          </Text>
          <Text fontSize="$6" color="black" fow="700">
            Product ID: {transaction.productId}
          </Text>
          <Text fontSize="$6" color="black">
            Date: {transaction.date}
          </Text>
        </YStack>
        <Text fos="$7" fow="700" color="black">
          {transaction.volume} ETH
        </Text>
      </XStack>
    </Card>
  )
}

export default TransactionCard
