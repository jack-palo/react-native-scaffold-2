import {
  Input as _Input,
  InputField as _InputField,
  styled,
} from '@gluestack-ui/themed'

/**
  Input example:
  <Input>
    <InputField placeholder="Enter Text here" />
  </Input>
 */
export const Input = styled(_Input, {
  margin: '$1',
  backgroundColor: '$white',
})

export const InputField = styled(_InputField)
