import { Stack } from 'expo-router'
import React from 'react'

export const NavigationStack: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#f2f7fd' }, // $customSecondaryColor not working here
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Root' }} />
      <Stack.Screen
        name="sign-in"
        options={{ headerTitle: 'Login', headerShown: false }}
      />
      <Stack.Screen name="register" options={{ headerTitle: 'Register' }} />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  )
}
