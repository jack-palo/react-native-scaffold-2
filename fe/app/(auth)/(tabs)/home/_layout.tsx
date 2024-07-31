import { Stack } from 'expo-router'
import React from 'react'

const HomeLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'Home' }} />
      <Stack.Screen name="setting/index" options={{ headerTitle: 'Setting' }} />
    </Stack>
  )
}

export default HomeLayout
