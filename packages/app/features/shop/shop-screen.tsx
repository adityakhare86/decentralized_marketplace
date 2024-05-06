import { Button, Paragraph, YStack, XStack, H1, Text, Separator } from '@my/ui'
import { Plus } from '@tamagui/lucide-icons'
import { ChevronLeft } from '@tamagui/lucide-icons'
import React from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { ConnectButton } from '../../thirdweb'
import { client } from '../../client'
import { Navbar } from '../navbar/navbar'
import { ProductCard } from '../product-card/product-card'
import { AddProduct } from '../add-product/add-product'

export function ShopScreen() {
  // Implement the functio to fetch products on user's shop
  const userProducts = [
    {
      id: 1,
      title: 'Item 1',
      description: 'Description for Item 1',
      price: 0.0009,
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
    },
    {
      id: 2,
      title: 'Item 2',
      description: 'Description for Item 2',
      price: 0.00001,
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
    },
    {
      id: 3,
      title: 'Item 3',
      description: 'Description for Item 3',
      price: 0.00001,
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
    },
  ]

  const productPresent = userProducts.length ? true : false

  return (
    <YStack f={1} jc="flex-start" ai="flex-start" gap="$4" bg="black">
      <Navbar />
      <XStack f={1} ai="flex-start" jc="space-between" gap="$4" pl="$8" w="100%" pr="$8">
        <H1 fontFamily="$heading" fontSize="$12" color="white" lineHeight="$10">
          My Shop ✦
        </H1>
        {/* <Button icon={Plus} fontWeight="bold" size="$5">
          Add new product
        </Button> */}
        <AddProduct />
      </XStack>
      <Separator />
      {productPresent ? (
        <XStack f={4} gap="$4" fw="wrap" pl="$8" w="100%" pr="$8">
          {userProducts.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
              id={item.id}
            />
          ))}
        </XStack>
      ) : (
        <YStack f={4} ai="center" jc="flex-start" pl="$8" w="100%" pr="$8">
          <Text fontSize="$9" color="grey">
            Create your first product to start ✦
          </Text>
        </YStack>
      )}
    </YStack>
  )
}
