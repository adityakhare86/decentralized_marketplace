import { X, Plus } from '@tamagui/lucide-icons'
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Sheet,
  Unspaced,
  XStack,
  Text,
  TextArea,
} from 'tamagui'

export function AddProduct() {
  return <AddProductInstance />
}

function AddProductInstance() {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button icon={Plus} fontWeight="bold" size="$5">
          Add new product
        </Button>
      </Dialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          themeInverse
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title fos="$10">Add a new poduct</Dialog.Title>

          <Dialog.Description fos="$6">
            Fill up the details and upload an image to create a new product in your shop.
          </Dialog.Description>

          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="product_name" fos="$5">
              Product Name
            </Label>

            <Input flex={1} id="product_name" />
          </Fieldset>

          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="price" fos="$5">
              Price
            </Label>
            <Input flex={0.0125} id="price" />
            <Text>ETH</Text>
          </Fieldset>

          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="image" fos="$5">
              Product Image
            </Label>
            {/* Implment the upload to IPFS function */}
          </Fieldset>

          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="description" fos="$5">
              Description
            </Label>
            <TextArea flex={1} id="description" />
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              {/* Create a function to add the product to the user's profile */}
              <Button size="$6" fontWeight="bold" theme="active" aria-label="Close" fontSize="$6">
                Add to Shop ✦
              </Button>
            </Dialog.Close>
          </XStack>
          <Unspaced>
            <Dialog.Close asChild>
              <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
