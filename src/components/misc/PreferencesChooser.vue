<template>
  <div>
    <div class="preferences-container">
      <div class="preference-item">
        <div class="flex mb-2 align-items-center justify-content-between">
          <div class="preference-label">ايام الاوف</div>
          <Rating dir="ltr" :stars="3" v-model="daysOffImportance" :cancel="false" />
        </div>
        <SelectButton
          :allow-empty="false"
          dir="ltr"
          v-model="daysOffValue"
          :options="preferenceOptions.daysOff"
          option-label="label"
          option-value="value"
        />
      </div>

      <div class="preference-item">
        <div class="flex mb-2 align-items-center justify-content-between">
          <div class="preference-label">وقت بداية الجدول</div>
          <Rating dir="ltr" :stars="3" v-model="startTimeImportance" :cancel="false" />
        </div>
        <SelectButton
          :allow-empty="false"
          dir="ltr"
          v-model="startTimeValue"
          :options="preferenceOptions.startTime"
          option-label="label"
          option-value="value"
        />
      </div>

      <div class="preference-item">
        <div class="flex mb-2 align-items-center justify-content-between">
          <div class="preference-label">وقت نهاية الجدول</div>
          <Rating dir="ltr" :stars="3" v-model="endTimeImportance" :cancel="false" />
        </div>
        <SelectButton
          :allow-empty="false"
          dir="ltr"
          v-model="endTimeValue"
          :options="preferenceOptions.endTime"
          option-label="label"
          option-value="value"
        />
      </div>

      <div class="preference-item">
        <div class="flex mb-2 align-items-center justify-content-between">
          <div class="preference-label">البريكات</div>
          <Rating dir="ltr" :stars="3" v-model="breaksImportance" :cancel="false" />
        </div>
        <SelectButton
          :allow-empty="false"
          dir="ltr"
          v-model="breaksValue"
          :options="preferenceOptions.breaks"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="preference-item">
        <div class="flex mb-2 align-items-center justify-content-between">
          <div class="preference-label">طول الجدول</div>
          <Rating dir="ltr" :stars="3" v-model="scheduleLengthImportance" :cancel="false" />
        </div>
        <SelectButton
          :allow-empty="false"
          dir="ltr"
          v-model="scheduleLengthValue"
          :options="preferenceOptions.breaks"
          option-label="label"
          option-value="value"
        />
      </div>

      <div class="preference-item">
        <div class="preference-label mb-3">
          عدد الاقتراحات:
          <span class="mx-1">{{ suggestionsCount }}</span>
        </div>
        <Slider v-model="suggestionsCount" :step="1" :min="1" :max="15" />
      </div>
    </div>

    <Button class="mt-3" @click="onSubmit">تاكيد</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import { PREFERENCES_AR } from '../../utils/constants'
import {
  DaysOffPreference,
  TimePreference,
  BreaksPreference,
  ScheduleLengthPreference
} from '../../utils/interfaces'
import { useUserPreferenceStore } from '../../stores/userPreference'
import Schedule from '../../classes/Schedule'
import SchedulesRanker from '../../classes/SchedulesRanker'
import Slider from 'primevue/slider'
import Rating from 'primevue/rating'

const props = defineProps<{
  schedules: Schedule[]
}>()
const emit = defineEmits(['submit', 'close'])

const userPreferenceStore = useUserPreferenceStore()
const preferences = userPreferenceStore.preferences
const importance = userPreferenceStore.preferencesImportance
const suggestionsCount = ref(userPreferenceStore.suggestionsCount)

const daysOffValue = ref(preferences.daysOff)
const startTimeValue = ref(preferences.startTimePreference)
const endTimeValue = ref(preferences.endTimePreference)
const breaksValue = ref(preferences.breaks)
const scheduleLengthValue = ref(preferences.scheduleLength)

const daysOffImportance = ref(importance.daysOff)
const startTimeImportance = ref(importance.startTimePreference)
const endTimeImportance = ref(importance.endTimePreference)
const breaksImportance = ref(importance.breaks)
const scheduleLengthImportance = ref(importance.scheduleLength)
const preferenceOptions = {
  daysOff: Object.values(DaysOffPreference).map((value) => ({
    label: PREFERENCES_AR[value],
    value
  })),
  startTime: Object.values(TimePreference).map((value) => ({
    label: PREFERENCES_AR[value],
    value
  })),
  endTime: Object.values(TimePreference).map((value) => ({ label: PREFERENCES_AR[value], value })),
  breaks: Object.values(BreaksPreference).map((value) => ({ label: PREFERENCES_AR[value], value })),
  scheduleLength: Object.values(ScheduleLengthPreference).map((value) => ({
    label: PREFERENCES_AR[value],
    value
  }))
}

const updatePreferences = () => {
  useUserPreferenceStore().setPreferences({
    daysOff: daysOffValue.value,
    breaks: breaksValue.value,
    startTimePreference: startTimeValue.value,
    endTimePreference: endTimeValue.value,
    scheduleLength: scheduleLengthValue.value
  })
  useUserPreferenceStore().setPreferencesImportance({
    daysOff: daysOffImportance.value,
    breaks: breaksImportance.value,
    startTimePreference: startTimeImportance.value,
    endTimePreference: endTimeImportance.value,
    scheduleLength: scheduleLengthImportance.value
  })
  useUserPreferenceStore().setSuggestionsCount(suggestionsCount.value)
}

const onSubmit = () => {
  updatePreferences()
  const schedulesRanker = new SchedulesRanker(props.schedules)
  const preferences = useUserPreferenceStore().preferences
  const preferencesImportance = useUserPreferenceStore().preferencesImportance
  const rankedSchedules = schedulesRanker.rankSchedules(
    preferences,
    preferencesImportance,
    suggestionsCount.value
  )
  emit('submit', rankedSchedules)
  emit('close')
}
</script>
<style scoped>
.preference-item {
  margin-bottom: 20px;
}

.preference-label {
  font-weight: bold;
  color: var(--text-color);
  font-size: 1.1rem;
}
</style>
