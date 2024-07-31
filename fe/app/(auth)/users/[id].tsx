import { Pressable, Text, View } from '@/components/commonComponents'
import { router, useLocalSearchParams } from 'expo-router'
import { useGetUserDetailById } from 'queries'
import React from 'react'
import { Image } from 'react-native'
import { useStore } from 'stores'

const UserDetails: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { isLoading, data } = useGetUserDetailById(id)

  // TEMP: test get value from store
  const { language } = useStore()

  const onPressGoBack = () => {
    router.back()
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!data) {
    return <Text>No data found</Text>
  }

  return (
    <View>
      <Text>Display Outside Tab Bar</Text>

      <Text>User Details {id} screen</Text>
      <Text>App Language {language}</Text>
      <Text>Name: {data.species.name}</Text>
      <Text>Type: {data.types[0].type.name}</Text>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        }}
        style={{ width: 100, height: 100 }}
      />

      <Pressable onPress={onPressGoBack}>
        <Text>-- Go back</Text>
      </Pressable>
    </View>
  )
}

export default UserDetails
