<template>
    <div class="schedule">
      <div class="hours-column">
        <div v-for="hour in 12" :key="hour" class="hour">
          {{ hour+7 }}:00
        </div>
      </div>
      <div class="days-container">
        <div v-for="day in days" :key="day">
          <Day :dayData="schedule[day]" :dayName="daysMap[day]" />
        </div>
      </div>
    </div>
  </template>
  

<script setup>
import { toRefs } from 'vue'
import Day from './Day.vue'

// Props
const props = defineProps({
  schedule: {
    type: Object,
    required: true
  }
})

// Convert props to reactive references
const { schedule } = toRefs(props)

// Define days
const days = ['sun', 'mon', 'tue', 'wed', 'thu']
const daysMap = {
  sun: 'الأحد',
  mon: 'الاثنين',
  tue: 'الثلاثاء',
  wed: 'الأربعاء',
  thu: 'الخميس'
}
</script>

<style scoped lang="scss">
.schedule {
  border: 1px solid #aaa;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
}

.hours-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 10px;
  border-right: 1px solid #aaa;
  margin-top: 65px;
}

.hour {
  height: 60px; // assuming 1 hour is 60px
  display: flex;
  align-items: center;
}

.days-container {
  display: flex;
  flex: 1;
}
</style>

