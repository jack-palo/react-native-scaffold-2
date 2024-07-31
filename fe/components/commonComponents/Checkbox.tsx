import {
  Checkbox as _Checkbox,
  CheckboxIcon as _CheckboxIcon,
  CheckboxIndicator as _CheckboxIndicator,
  CheckboxLabel as _CheckboxLabel,
  styled,
} from '@gluestack-ui/themed'

/**
  Checkbox example:
  <Checkbox isInvalid={false} isDisabled={false}>
    <CheckboxIndicator mr="$2">
      <CheckboxIcon as={CheckIcon} />
    </CheckboxIndicator>
    <CheckboxLabel>sample</CheckboxLabel>
  </Checkbox>
 */
export const Checkbox = styled(_Checkbox)
export const CheckboxIndicator = styled(_CheckboxIndicator)
export const CheckboxIcon = styled(_CheckboxIcon)
export const CheckboxLabel = styled(_CheckboxLabel)
