import { getUserDetailById } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from './queryKeys'

// TODO: organize and manage query key, constant
export const useGetUserDetailById = (id?: string) => {
  return useQuery({
    queryKey: [QueryKeys.USER, id],
    queryFn: async () => {
      if (!id) {
        throw new Error(`Invalid id: ${id}`)
      }

      return await getUserDetailById(id)
    },
  })
}
