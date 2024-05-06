import { Button, Paragraph, YStack, XStack, Text, H1, ScrollView, Separator } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import React from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { ConnectButton } from '../../thirdweb'
import { client } from '../../client'
import { Navbar } from '../navbar/navbar'
import { ProductCard } from '../product-card/product-card'

export function MarketScreen() {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const marketItems = [
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
    {
      id: 4,
      title: 'Item 1',
      description: 'Description for Item 1',
      price: 0.00001,
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
    },
    {
      id: 5,
      title: 'Item 2',
      description: 'Description for Item 2',
      price: 0.00001,
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
    },
    {
      id: 6,
      title: 'Item 3',
      description: 'Description for Item 3',
      price: 0.00002,
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
    },
    {
      id: 7,
      title: 'Item 1',
      description: 'Description for Item 1',
      price: 0.00001,
      imageUrl:
        'https://www.mutleyssnaps.co.uk/wp-content/uploads/2020/08/Pet-photography-scotland-dogs-and-cats-10.jpg',
    },
    {
      id: 8,
      title: 'Item 2',
      description: 'Description for Item 2',
      price: 0.00001,
      imageUrl:
        'https://www.mutleyssnaps.co.uk/wp-content/uploads/2020/08/Pet-photography-scotland-dogs-and-cats-10.jpg',
    },
    {
      id: 9,
      title: 'Item 3',
      description: 'Description for Item 3',
      price: 0.00001,
      imageUrl:
        'https://www.mutleyssnaps.co.uk/wp-content/uploads/2020/08/Pet-photography-scotland-dogs-and-cats-10.jpg',
    },
  ]

  return (
    <YStack f={1} jc="flex-start" ai="center" gap="$4" bg="black">
      <Navbar />
      <H1 ta="center" fontFamily="$heading" fontSize="$12" color="white" lineHeight="$10">
        Shop Now ✦
      </H1>
      <Separator />
      <ScrollView
        width="100%"
        backgroundColor="black"
        padding="$4"
        borderRadius="$4"
        showsVerticalScrollIndicator={false}
      >
        <XStack jc="center" gap="$4" fw="wrap">
          {marketItems.map((item) => (
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
      </ScrollView>
    </YStack>
  )
}
