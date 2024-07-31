import { useStore } from '@/stores'
import { Redirect } from 'expo-router'
import React from 'react'

// TODO: Bad UX, need to fix render root screen a second and navigate to home screen
const Root: React.FC = () => {
  const { hasLoggedIn } = useStore()

  // redirect to (auth) screen if HasLoggedIn is true
  if (hasLoggedIn) {
    return <Redirect href="/(auth)/(tabs)/home" />
  }

  return <Redirect href="/sign-in" />
}

export default Root
