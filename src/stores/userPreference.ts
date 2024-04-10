import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  Preferences,
  BreaksPreference,
  DaysOffPreference,
  TimePreference,
  ScheduleLengthPreference,
  PreferencesImportance
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

    const preferencesImportance = ref<PreferencesImportance>({
      breaks: 1,
      daysOff: 3,
      startTimePreference: 1,
      endTimePreference: 1,
      scheduleLength: 1
    })

    const suggestionsCount = ref<number>(5)

    const setSuggestionsCount = (count: number) => {
      suggestionsCount.value = count
    }
    const setPreferences = (newPreferences: Preferences) => {
      preferences.value = newPreferences
    }

    const setPreferencesImportance = (newPreferencesImportance: PreferencesImportance) => {
      preferencesImportance.value = newPreferencesImportance
    }

    return {
      preferences,
      setPreferences,
      suggestionsCount,
      setSuggestionsCount,
      preferencesImportance,
      setPreferencesImportance
    }
  },
  { persist: true }
)
