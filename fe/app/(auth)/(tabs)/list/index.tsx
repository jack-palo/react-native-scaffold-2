import { Pressable, Text, View } from '@/components/commonComponents'
import { router } from 'expo-router'
import React from 'react'
import { useStore } from 'stores'

const Root: React.FC = () => {
  const { setLanguage, setHasLoggedIn } = useStore()

  const onPressGoToHome = () => {
    router.push('/(auth)/(tabs)/home/')
  }

  const onLogout = () => {
    setHasLoggedIn(false)
    router.replace('/sign-in')
  }

  const onPressGoToUserDetails = (id: number) => {
    // TEMP: test call action store
    setLanguage(id % 2 === 0 ? 'TH' : 'EN')

    router.push({
      pathname: '/(auth)/users/[id]',
      params: { id },
    })
  }

  return (
    <View>
      <Text>Root screen</Text>
      <Pressable onPress={onPressGoToHome}>
        <Text>-- Go to Home screen</Text>
      </Pressable>
      <Pressable onPress={() => onPressGoToUserDetails(1)}>
        <Text style={{ fontFamily: 'light' }}>
          ---- Go to UserDetails 1 screen
        </Text>
      </Pressable>
      <Pressable onPress={() => onPressGoToUserDetails(2)}>
        <Text style={{ fontFamily: 'medium' }}>
          ---- Go to UserDetails 2 screen
        </Text>
      </Pressable>
      <Pressable onPress={() => onPressGoToUserDetails(3)}>
        <Text
          style={{
            fontFamily: 'bold',
          }}
        >
          ---- Go to UserDetails 3 screen
        </Text>
      </Pressable>
      <Text py="$4" size="lg" onPress={onLogout}>
        Logout
      </Text>
    </View>
  )
}

export default Root
