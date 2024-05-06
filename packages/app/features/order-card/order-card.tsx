import React from 'react'
import { YStack, Button, XStack, Text, Card } from '@my/ui'
import { Check, X } from '@tamagui/lucide-icons'

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

const OrderCard: React.FC<TransactionCardProps> = ({ transaction }) => {
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

  const handleAccept = () => {
    // Write logic to accept the product
  }

  const handleCancel = () => {
    // Write logic to cancel the product
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
        {!transaction.status ? (
          <XStack gap="$4">
            <Button
              circular
              fontWeight="bold"
              icon={Check}
              scaleIcon={2.5}
              size="$5"
              color="white"
              onPress={handleAccept}
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
              onPress={handleCancel}
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
