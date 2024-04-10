import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  Preferences,
  BreaksPreference,
  DaysOffPreference,
  TimePreference,
  ScheduleLengthPreference
} from '../utils/interfaces'

export const useUserPreferenceStore = defineStore(
  'userPreference',
  () => {
    const preferences = ref<Preferences>({
      breaks: BreaksPreference.None,
      daysOff: DaysOffPreference.None,
      startTimePreference: TimePreference.None,
      endTimePreference: TimePreference.None,
      scheduleLength: ScheduleLengthPreference.None
    })
    const suggestionsCount = ref<number>(5)
    const setSuggestionsCount = (count: number) => {
      suggestionsCount.value = count
    }
    const setPreferences = (newPreferences: Preferences) => {
      preferences.value = newPreferences
    }

    return { preferences, setPreferences, suggestionsCount, setSuggestionsCount }
  },
  { persist: true }
)
