import { useState } from 'react'
import { YStack, H1, XStack, Image, Text, Separator, Input, Button } from '@my/ui'
import { Navbar } from '../navbar/navbar'
import { useLink } from 'solito/link'
import { Trash } from '@tamagui/lucide-icons'

interface ProductScreenProps {
  id: number
}

export function ProductScreen({ id }: ProductScreenProps) {
  const marketItems = [
    {
      id: 1,
      title: 'Item 1',
      description:
        'Description for Item 1 What you mean ? Can you see me now, bro no Anuv Jain bro I hate it',
      price: 0.0009,
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
      sellerName: 'VVX',
      sellerId: '0x123456789',
    },
  ]

  // const { useParam } = createParam<{ id: number }>()
  // const [productId] = useParam('id')

  // Write logic to check if the user is the seller
  const isSeller = false

  const product = marketItems.find((item) => item.id === id) || marketItems[0]
  const link = useLink({
    href: `/user/${product.sellerId}`,
  })
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)

  const handleQuantityChange = (e: any) => {
    setQuantity(Number(e.target.value))
    setTotal(Number(e.target.value * product.price))
  }

  const handleBuyClick = () => {
    console.log(`Purchased ${quantity} of ${product.title} for ${product.price * quantity} ETH`)
  }

  const handleDelete = () => {
    // Write logic to delete the product from seller's shop
  }

  return (
    <YStack f={1} jc="flex-start" ai="center" gap="$4" bg="black">
      <Navbar />
      <XStack f={4} ai="center" jc="space-between" gap="$15">
        <Image
          resizeMode="contain"
          borderRadius="$8"
          source={{ uri: product.imageUrl }}
          width={500}
          height={600}
        />
        <YStack f={4} jc="center" ai="flex-start" gap="$4">
          <H1 size="$14" color="white">
            {product.title}
          </H1>
          <Separator />
          <Text w="70%" fontSize="$8" color="grey">
            Description:{'\n'}
            {product.description}
          </Text>
          <Text fontSize="$8" color="grey">
            Seller:{' '}
            <Text
              textDecorationStyle="solid"
              textDecorationLine="underline"
              hoverStyle={{ scale: 1.2 }}
              fontSize="$8"
              color="$blue7"
              selectable={false}
              {...link}
            >
              {product.sellerName}
            </Text>
          </Text>
          <Separator />
          <Text fontSize="$8" color="white">
            Price: {product.price} ETH
          </Text>
          {!isSeller ? (
            <XStack ai="center" gap="$2">
              <Text fontSize="$8" color="white">
                Quantity:
              </Text>
              <Input
                flex={1}
                onChange={handleQuantityChange}
                w={100}
                style={{ fontSize: 25, fontWeight: 'bold' }}
                size="$3"
                placeholder={'0'}
              />
            </XStack>
          ) : null}
          <Separator />
          {total ? (
            <Text fontWeight="bold" fontSize="$8" color="white">
              Total: {total} ETH + gas 🔥
            </Text>
          ) : null}
          {isSeller ? (
            <Button
              fontWeight="bold"
              icon={Trash}
              size="$5"
              color="white"
              onPress={handleDelete}
              bg="red"
              hoverStyle={{
                backgroundColor: 'red',
              }}
              pressStyle={{
                backgroundColor: '$red7',
              }}
            >
              Delete Product
            </Button>
          ) : (
            <Button fontWeight="bold" size="$5" onPress={handleBuyClick} theme="dark">
              Buy Now
            </Button>
          )}
        </YStack>
      </XStack>
    </YStack>
  )
}
