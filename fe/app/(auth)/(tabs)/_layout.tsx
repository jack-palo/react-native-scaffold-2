import { Tabs } from 'expo-router'
import React from 'react'

const TabNavigation: React.FC = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ title: 'Home', headerShown: false }}
      />
      <Tabs.Screen name="list/index" options={{ title: 'List' }} />
    </Tabs>
  )
}

export default TabNavigation
