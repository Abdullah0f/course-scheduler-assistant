<template>
  <div class="schedule">
    <div v-for="day in days" :key="day">
      <Day :dayData="schedule[day]" :dayName="daysMap[day]" />
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

<style scoped>
.schedule {
  border: 1px solid #aaa;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
}
</style>
