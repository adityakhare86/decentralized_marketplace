import { Card, H2, Paragraph, XStack, Button, Image } from '@my/ui'
import { useEffect } from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { hexToNumber } from 'thirdweb'

interface Product {
  productId: any
  title: string
  description: string
  price: any
  image: string
}

export function ProductCard({ product }: { product: Product }) {
  const { productId, title, description, price, image } = product
  const numericId = productId ? hexToNumber(productId) : null

  const link = useLink({
    href: `/product/${numericId}`,
  })

  return (
    <Card
      elevate
      size="$4"
      height={400}
      width={360}
      bordered
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      {...link}
    >
      <Card.Header padded>
        <H2>{title}</H2>
        <Paragraph theme="alt2">{description}</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button fontWeight="bold" size="$4" themeInverse borderRadius="$10">
          {hexToNumber(price)} ⟠ Wei
        </Button>
      </Card.Footer>
      <Card.Background>
        <Image
          resizeMode="contain"
          alignSelf="center"
          borderRadius="$8"
          source={{ uri: image }}
          width={800}
          height={800}
        />
      </Card.Background>
    </Card>
  )
}
