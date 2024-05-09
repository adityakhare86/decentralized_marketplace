import { YStack, XStack, H1, ScrollView, Separator } from '@my/ui'
import { Navbar } from '../navbar/navbar'
import { ProductCard } from '../product-card/product-card'
import { hexToNumber, readContract } from 'thirdweb'
import { useState, useEffect } from 'react'
import { contract } from '/home/aditya/cminor/packages/app/contract'

export function MarketScreen() {
  const [marketItems, setMarketItems] = useState<any>([])

  useEffect(() => {
    async function fetchMarketItems() {
      try {
        const items = await readContract({
          contract: contract,
          method: 'viewAllProducts',
        })
        setMarketItems(items)
      } catch (error) {
        console.error('Error fetching market items:', error)
      }
    }

    fetchMarketItems()
  }, [])
  console.log(marketItems)

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
          {marketItems.length ? (
            marketItems.map((item) => <ProductCard key={item.productId} product={item} />)
          ) : (
            <H1>Loading ...</H1>
          )}
        </XStack>
      </ScrollView>
    </YStack>
  )
}
