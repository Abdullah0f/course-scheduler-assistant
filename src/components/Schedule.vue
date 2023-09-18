<template>
    <div class="schedule">
      <div class="hours-column">
        <div v-for="hour in 8" :key="hour" class="hour" :style="{height: size+'px'}">
          {{ (hour+7)%12 }}:00
        </div>
      </div>
      <div class="days-container">
        <div v-for="day in days" :key="day">
          <h2>{{ daysMap[day] }}</h2>
          <Day :dayData="schedule[day]" />
        </div>
      </div>
    </div>
  </template>
  

<script setup>
import { provide, toRefs, ref } from 'vue'
import Day from './Day.vue'

// Props
const props = defineProps({
  schedule: {
    type: Object,
    required: true
  },
  size:{
    type: Number,
    required: false,
    default: 100
  }
})
const size = ref(props.size)
provide('size', size.value)

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
h2{
  text-align: center;
}
.hours-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 10px;
  border-right: 1px solid #aaa;
  margin-top: 25px;
}

.hour {
  display: flex;
  align-items: center;
}

.days-container {
  display: flex;
  flex: 1;
}
</style>

