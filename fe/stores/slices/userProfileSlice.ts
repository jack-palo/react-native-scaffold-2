import { StateCreator } from 'zustand'
import { AppState, UserProfileSlice } from './type'

export const createUserProfileSlice: StateCreator<
  AppState,
  [],
  [],
  UserProfileSlice
> = (set, get, store) => ({
  username: '',
  email: '',
  hasLoggedIn: false,
  setUsername: (username: string) => set((state) => ({ username })),
  setEmail: (email: string) => set((state) => ({ email })),
  setHasLoggedIn: (hasLoggedIn: boolean) => set((state) => ({ hasLoggedIn })),
})
