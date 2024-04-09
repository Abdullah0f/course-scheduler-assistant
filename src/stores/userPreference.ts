import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Preferences } from 'src/utils/interfaces'

export const useUserPreferenceStore = defineStore(
  'userPreference',
  () => {
    const preferences = ref<Preferences>({})
    const setPreferences = (newPreferences: Preferences) => {
      preferences.value = newPreferences
    }

    return { preferences, setPreferences }
  },
  { persist: true }
)
