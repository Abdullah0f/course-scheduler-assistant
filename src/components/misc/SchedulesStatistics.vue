<template>
  <div class="flex flex-wrap statistics-container">
    <!-- <div class="statistics-card" v-for="statistic in statisticsInfo" :key="statistic.label">
      <div class="card-header">{{ statistic.label }}</div>
      <div class="card-content">
        {{ statistic.isLocaleString ? statistic.value.toLocaleString() : statistic.value }}
        {{ statistic.unit }}
      </div>
    </div> -->
    
  </div>
  <Button @click="statsDialogVisibility = true" label="الاحصائيات" icon="pi pi-chart-bar" :icon-pos="'right'" :pt="{
      icon: 'mx-2'
    }" />
    <Dialog v-model:visible="statsDialogVisibility" modal maximizable :draggable="false" style="width: 50vw" >
      <h2>إحصائيات عن الجداول</h2>
      <div class="flex flex-column gap-2">
        <div >
          <h3>ايام الأوف</h3>
          <ScheduleChart :data="statistics.noOfDaysOff" label="عدد الأيام الأوف" />
          <ScheduleChart :data="statistics.offDays" label="حسب اليوم" /> 
        </div>
        <div>
          <h3>الوقت</h3>
          <ScheduleChart :data="statistics.scheduleLength" label=" (بالساعة) طول الجدول" />
          <ScheduleChart :data="statistics.startTimeOccurences" label="وقت البداية" />
          <ScheduleChart :data="statistics.endTimeOccurences" label="وقت الانتهاء" />
          <ScheduleChart :data="statistics.totalBreaksOccurences" label="(بالدقائق) فترات البريك" />
        </div>
      </div>

    </Dialog>

</template>

<script setup lang="ts">
import { computed, onMounted , ref} from 'vue'
import { AnalysisResult } from '../../classes/SchedulesRanker'
import ScheduleChart from './ScheduleChart.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
const props = defineProps<{
  statistics: AnalysisResult
}>()
const statsDialogVisibility = ref(false)

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

const statisticsInfo = computed(() => [
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
    label: 'أقصى وقت للبداية',
    value: to12HourFormat(props.statistics.maxStartTime),
    unit: '',
    isLocaleString: false
  },
  {
    label: 'اقل وقت للبداية',
    value: to12HourFormat(props.statistics.minStartTime),
    unit: '',
    isLocaleString: false
  },
  {
    label: 'أقصى وقت للانتهاء',
    value: to12HourFormat(props.statistics.maxEndTime),
    unit: '',
    isLocaleString: false
  },
  {
    label: 'اقل وقت للانتهاء',
    value: to12HourFormat(props.statistics.minEndTime),
    unit: '',
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
onMounted(() => {
  console.log(props.statistics)
})
</script>

<style scoped>
.statistics-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.statistics-card {
  /* dark mode */
  background-color: #2c2f33;
  color: #ffffff;
  /* light mode */
  background-color: #ffffff;
  color: #000000;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;

  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
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
