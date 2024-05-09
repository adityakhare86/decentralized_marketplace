import { useState, useEffect } from 'react'
import { YStack, H1, XStack, Image, Text, Separator, Input, Button } from '@my/ui'
import { Navbar } from '../navbar/navbar'
import { Trash } from '@tamagui/lucide-icons'
import { hexToNumber, readContract } from 'thirdweb'
import { contract } from '../../contract'
import { createParam } from 'solito'
import { Link } from 'solito/link'
import { LoadingScreen } from '../loading/loading'

const { useParam } = createParam<{ id: string }>()

export function ProductScreen() {
  const isSeller = false
  const [marketItems, setMarketItems] = useState<any>([])
  const [productId] = useParam('id')
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchMarketItems() {
      setLoading(true)
      try {
        const items = await readContract({
          contract: contract,
          method: 'viewAllProducts',
        })
        setMarketItems(items)
      } catch (error) {
        console.error('Error fetching market items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketItems()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  const product = marketItems?.find((item) => hexToNumber(item?.productId) === Number(productId))
  const sellerLink = `/user/${product?.seller}`

  const handleQuantityChange = (e: any) => {
    setQuantity(Number(e.target.value))
    setTotal(Number(e.target.value * hexToNumber(product.price)))
  }

  const handleBuyClick = () => {
    console.log(`Purchased ${quantity} of ${product.title} for ${total} ETH`)
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
          source={{ uri: product.image }}
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
            <Link style={{ color: 'white' }} href={sellerLink}>
              <Text
                textDecorationStyle="solid"
                textDecorationLine="underline"
                hoverStyle={{ scale: 1.02 }}
                fontSize="$6"
                color="$blue7"
                selectable={false}
              >
                {product.seller}
              </Text>
            </Link>
          </Text>
          <Separator />
          <Text fontSize="$8" color="white">
            Price: {hexToNumber(product.price)} ETH
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
