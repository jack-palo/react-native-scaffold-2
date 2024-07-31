import { NavigationStack } from '@/components/configComponents'
import { fontConfig, gluestackConfig, queryClient } from '@/config/index'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import React from 'react'

const RootLayout: React.FC = () => {
  const [fontsLoaded, fontError] = useFonts(fontConfig)
  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <GluestackUIProvider config={gluestackConfig}>
      <QueryClientProvider client={queryClient}>
        <NavigationStack />
      </QueryClientProvider>
    </GluestackUIProvider>
  )
}

export default RootLayout
