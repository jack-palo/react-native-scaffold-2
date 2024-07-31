export type AppSettingSlice = {
  theme: string
  language: string
  darkMode: boolean
  setTheme: (theme: string) => void
  setLanguage: (language: string) => void
  toggleDarkMode: () => void
}

export type UserProfileSlice = {
  username: string
  email: string
  hasLoggedIn: boolean
  setUsername: (username: string) => void
  setEmail: (email: string) => void
  setHasLoggedIn: (hasLoggedIn: boolean) => void
}

export type AppState = AppSettingSlice & UserProfileSlice
