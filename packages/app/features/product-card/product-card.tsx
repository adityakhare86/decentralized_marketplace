import { Card, H2, Paragraph, XStack, Button, Image } from '@my/ui'
import { createParam } from 'solito'
import { useLink } from 'solito/link'

interface ProductCardProps {
  id: number
  title: string
  description: string
  price: number
  imageUrl: string
}

export function ProductCard({ id, title, description, price, imageUrl }: ProductCardProps) {
  const { useParam } = createParam<{ id: string }>()
  const [paramId] = useParam('id')
  const link = useLink({
    href: `/product/${id}`,
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
          {price} ⟠ ETH
        </Button>
      </Card.Footer>
      <Card.Background>
        <Image
          resizeMode="contain"
          alignSelf="center"
          borderRadius="$8"
          source={{ uri: imageUrl }}
          width={800}
          height={800}
        />
      </Card.Background>
    </Card>
  )
}
