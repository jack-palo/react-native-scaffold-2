import { Pressable, Text, View } from '@/components/commonComponents'
import { HomeSectionA, HomeSectionB } from '@/components/screenComponents'
import { useStore } from '@/stores'
import { router } from 'expo-router'
import React from 'react'

const Home: React.FC = () => {
  const { setHasLoggedIn } = useStore()

  return (
    <View testID="home-screen">
      <Text>Home screen X</Text>
      {/* <Button text="button" iconLeft={ArrowLeftIcon} />
      <Button text="loading" isLoading iconRight={AddIcon} /> */}
      <HomeSectionA />
      <HomeSectionB />

      <Pressable onPress={() => router.push('/home/setting/')}>
        <Text>-- Setting</Text>
      </Pressable>
    </View>
  )
}

export default Home
