<template>
  <div class="flex flex-wrap statistics-container">
    <div class="statistics-card" v-for="statistic in statisticsInfo" :key="statistic.label">
      <div class="card-header">{{ statistic.label }}</div>
      <div class="card-content">
        {{ statistic.isLocaleString ? statistic.value.toLocaleString() : statistic.value }}
        {{ statistic.unit }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AnalysisResult } from '../../classes/SchedulesRanker'
const props = defineProps<{
  statistics: AnalysisResult
}>()

const to12HourFormat = (time) => {
  const date = new Date()
  date.setHours(time)
  let hours = date.getHours()
  let period = 'صباحًا'
  if (hours >= 12) {
    period = 'مساءً'
    hours -= 12
  }
  if (hours === 0) {
    hours = 12
  }
  return `${hours} ${period}`
}

const statisticsInfo = ref([
  {
    label: 'متوسط طول الجدول',
    value: props.statistics.averageTimeDifference,
    unit: 'ساعات',
    isLocaleString: true
  },
  {
    label: 'متوسط وقت البداية',
    value: to12HourFormat(props.statistics.averageStartTime),
    unit: '',
    isLocaleString: false
  },
  {
    label: 'متوسط وقت الانتهاء',
    value: to12HourFormat(props.statistics.averageEndTime),
    unit: '',
    isLocaleString: false
  },
  {
    label: 'متوسط البريكات',
    value: props.statistics.averageTotalBreaks,
    unit: 'دقيقة',
    isLocaleString: true
  },
  {
    label: 'متوسط أيام الاوف',
    value: props.statistics.averageDaysOff,
    unit: 'أيام',
    isLocaleString: true
  },
  {
    label: 'أقصى عدد أيام اوف',
    value: props.statistics.maxDaysOff,
    unit: 'أيام',
    isLocaleString: false
  },
  {
    label: 'أدنى عدد أيام اوف',
    value: props.statistics.minDaysOff,
    unit: 'أيام',
    isLocaleString: false
  },
  {
    label: 'أقصى وقت للبداية',
    value: props.statistics.maxStartTime,
    unit: 'ساعات',
    isLocaleString: false
  },
  {
    label: 'اقل وقت للبداية',
    value: props.statistics.minStartTime,
    unit: 'ساعات',
    isLocaleString: false
  },
  {
    label: 'أقصى وقت للانتهاء',
    value: props.statistics.maxEndTime,
    unit: 'ساعات',
    isLocaleString: false
  },
  {
    label: 'اقل وقت للانتهاء',
    value: props.statistics.minEndTime,
    unit: 'ساعات',
    isLocaleString: false
  },
  {
    label: 'اقصر طول جدول',
    value: props.statistics.minTimeDifference,
    unit: 'ساعات',
    isLocaleString: false
  },
  {
    label: 'اطول طول جدول',
    value: props.statistics.maxTimeDifference,
    unit: 'ساعات',
    isLocaleString: false
  },
  {
    label: 'أقصى مجموع فترات البريك',
    value: props.statistics.maxTotalBreaks,
    unit: 'دقائق',
    isLocaleString: false
  },
  {
    label: 'أدنى مجموع فترات البريك',
    value: props.statistics.minTotalBreaks,
    unit: 'دقائق',
    isLocaleString: false
  }
])
</script>

<style scoped>
.statistics-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.statistics-card {
  background-color: #2c2f33;
  color: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.card-header {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-content {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
