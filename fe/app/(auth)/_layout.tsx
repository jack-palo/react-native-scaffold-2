import { Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {
  console.log('🚀 ~ AuthLayout ~ AuthLayout:')
  // TODO: redirect back to /sign-in screen if HasLoggedIn is false, if user access this via deep link

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ title: '', headerShown: false }}
      ></Stack.Screen>
    </Stack>
  )
}

export default AuthLayout
