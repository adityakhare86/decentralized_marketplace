import { YStack, styled } from 'tamagui'

export const MyComponent = styled(YStack, {
  name: 'MyComponent',
  backgroundColor: 'red',

  variants: {
    blue: {
      true: {
        backgroundColor: 'blue',
      },
    },
  } as const,
})
