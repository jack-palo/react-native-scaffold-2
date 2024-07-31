import {
  Button,
  ButtonText,
  Input,
  InputField,
  Text,
  View
} from '@/components/commonComponents'
import { useStore } from '@/stores'
import { router } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const SignIn: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { setHasLoggedIn } = useStore()

  const handleLogin = () => {
    // Handle login logic here
    setHasLoggedIn(true)
    router.replace('/(auth)/(tabs)/home')
  }

  return (
    <View m='$3' pt='$20' testID='sign-in-screen'>
      {/* Email */}
      <Controller
        control={control}
        rules={{ required: true }}
        name='email'
        render={({ field: { onChange, value } }) => (
          <Input
            variant='rounded'
            size='md'
            isDisabled={false}
            isInvalid={!!errors.email}
            isReadOnly={false}
          >
            <InputField
              testID='emailInput'
              placeholder='Enter Email here'
              value={value}
              onChangeText={onChange}
            />
          </Input>
        )}
      />
      {errors.email && <Text>This is required.</Text>}

      {/* Password */}
      <Controller
        control={control}
        rules={{ required: true }}
        name='password'
        render={({ field: { onChange, value } }) => (
          <Input
            variant='rounded'
            size='md'
            isDisabled={false}
            isInvalid={!!errors.password}
            isReadOnly={false}
          >
            <InputField
              testID='passwordInput'
              placeholder='Enter password here'
              value={value}
              onChangeText={onChange}
            />
          </Input>
        )}
      />
      {errors.password && <Text>This is required.</Text>}

      {/* Login */}
      <Button
        testID='signInButton'
        onPress={handleSubmit(handleLogin)}
        size='md'
        variant='solid'
        action='primary'
        isDisabled={false}
        isFocusVisible={false}
      >
        <ButtonText>Login </ButtonText>
      </Button>

      {/* Register */}
      <Text m='$3' color='$customPrimaryColor'>
        Don't have an account?{' '}
        <Text onPress={() => router.push('/register')} color='$blue600' bold>
          Register
        </Text>
      </Text>
    </View>
  )
}

export default SignIn
