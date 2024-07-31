import { StateCreator } from 'zustand'
import { AppSettingSlice, AppState } from './type'

export const createAppSettingSlice: StateCreator<
  AppState,
  [],
  [],
  AppSettingSlice
> = (set, get, store) => ({
  theme: 'light',
  language: 'en',
  darkMode: false,
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
})
