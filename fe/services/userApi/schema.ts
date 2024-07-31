import { z } from 'zod'

export const userProfileSchema = z.object({
  id: z.number(),
  species: z.object({
    name: z.string(),
  }),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
      }),
    }),
  ),
})
