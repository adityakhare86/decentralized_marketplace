import { useState, useEffect } from 'react'
import { YStack, H1, XStack, Image, Text, Separator, Input, Button } from '@my/ui'
import { Navbar } from '../navbar/navbar'
import { Trash } from '@tamagui/lucide-icons'
import { hexToNumber, readContract, toEther, toWei } from 'thirdweb'
import { contract } from '../../contract'
import { createParam } from 'solito'
import { Link, useLink } from 'solito/link'
import { LoadingScreen } from '../loading/loading'
import { prepareContractCall, sendTransaction, resolveMethod } from 'thirdweb'
import { useActiveAccount } from 'thirdweb/react'

const { useParam } = createParam<{ id: string }>()

export function ProductScreen() {
  const account = useActiveAccount()!
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
  const isSeller = account?.address === product.seller ? true : false
  const sellerLink = `/user/${product?.seller}`

  const handleQuantityChange = (e: any) => {
    setQuantity(Number(e.target.value))
    setTotal(Number(e.target.value * hexToNumber(product.price)))
  }

  async function handleBuyClick(account, _productId, _quantity, _price) {
    const transaction = await prepareContractCall({
      contract,
      method: 'buyProduct',
      params: [_productId, _quantity],
      value: BigInt(_quantity * _price),
    })
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    })
    if (transactionHash) {
      alert(`Verificaton hash : ${transactionHash}`)
    }
  }

  async function handleDelete(account, _productId) {
    const transaction = await prepareContractCall({
      contract,
      method: 'deleteProduct',
      params: [_productId],
    })
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    })
    if (transactionHash) {
      alert(`Verificaton hash : ${transactionHash}`)
      window.location.href = `http://localhost:3000/shop/${account.address}`
    }
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
          {account && !isSeller ? (
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
          {account &&
            (isSeller ? (
              <Button
                fontWeight="bold"
                icon={Trash}
                size="$5"
                color="white"
                onPress={() => handleDelete(account, product.productId)}
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
              <Button
                fontWeight="bold"
                size="$5"
                onPress={() =>
                  handleBuyClick(account, product.productId, quantity, hexToNumber(product.price))
                }
                theme="dark"
              >
                Buy Now
              </Button>
            ))}
        </YStack>
      </XStack>
    </YStack>
  )
}
