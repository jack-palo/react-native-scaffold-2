import axiosInstance from '@/config/axios'
import { userProfileSchema } from './schema'

export const getUserDetailById = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    )
    const pokemon = userProfileSchema.parse(response.data)
    return pokemon
  } catch (error) {
    console.error('Error fetching Pokemon details:', error)
    throw error
  }
}
