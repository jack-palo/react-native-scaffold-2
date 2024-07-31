import { mmkvStorage } from '@/config/mmkvStorageConfig'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createAppSettingSlice, createUserProfileSlice } from './slices/index'
import { AppState } from './slices/type'

const persistConfig = {
  name: 'app-persist-storage',
  // TODO: will replace with MMKV
  storage: createJSONStorage(() => mmkvStorage),

  /**
   * Setting persist data and keep in the local storage
   */
  partialize: (state: AppState) => ({ hasLoggedIn: state.hasLoggedIn }),
}

export const useStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createUserProfileSlice(...a),
      ...createAppSettingSlice(...a),
    }),
    persistConfig,
  ),
)
