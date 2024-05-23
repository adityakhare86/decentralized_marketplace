import { YStack, XStack, H1, Text, Separator } from '@my/ui'
import { Navbar } from '../navbar/navbar'
import { ProductCard } from '../product-card/product-card'
import { AddProduct } from '../add-product/add-product'
import { useState, useEffect } from 'react'
import { contract } from '../../contract'
import { useActiveAccount } from 'thirdweb/react'
import { readContract } from 'thirdweb'

export function ShopScreen() {
  // Implement the function to fetch products on user's shop
  const activeAccount = useActiveAccount()
  const [marketItems, setMarketItems] = useState<any>([])

  // console.log(activeAccount)
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

  const userProducts = marketItems.filter((item: any) => item.seller === activeAccount?.address)

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
            <ProductCard key={item.productId} product={item} />
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
