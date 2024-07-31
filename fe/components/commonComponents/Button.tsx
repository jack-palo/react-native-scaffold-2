import {
  Button as _Button,
  ButtonIcon as _ButtonIcon,
  ButtonText as _ButtonText,
  styled,
} from '@gluestack-ui/themed'

/** Icon reference: https://gluestack.io/ui/docs/components/media-and-icons/icon */
// type ButtonProp = {
//   action?: 'primary' | 'secondary' | 'positive' | 'negative' | 'default'
//   iconLeft?: any
//   iconRight?: any
//   isDisabled?: boolean
//   isLoading?: boolean
//   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
//   text: string
//   variant?: 'solid' | 'outline' | 'link'
// }

// export const Button: React.FC<ButtonProp> = ({
//   action = 'primary',
//   iconLeft,
//   iconRight,
//   isDisabled = false,
//   isLoading = false,
//   size = 'md',
//   text,
//   variant = 'solid',
// }) => {
//   return (
//     <_Button
//       action={action}
//       bg="$amber600"
//       isDisabled={isDisabled}
//       size={size}
//       variant={variant}
//       borderRadius="$md"
//       m="$1"
//     >
//       {isLoading && <ButtonSpinner mr="$1" />}
//       {iconLeft && (
//         <ButtonIcon as={iconLeft} h="$3" w="$3" color="$backgroundLight900" />
//       )}
//       <ButtonText fontWeight="$medium" fontSize="$sm" color="$textLight900">
//         {text}
//       </ButtonText>
//       {iconRight && (
//         <ButtonIcon as={iconRight} h="$3" w="$3" color="$backgroundLight900" />
//       )}
//     </_Button>
//   )
// }

// TODO: customize like above
export const Button = styled(_Button, {
  margin: '$1',
})

export const ButtonText = styled(_ButtonText)
export const ButtonIcon = styled(_ButtonIcon)
