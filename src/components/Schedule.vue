<template>
    <div class="schedule">
      <div class="schedule-column">
      <div class="hours-column">
        <h2>الوقت</h2>
        <div v-for="hour in 8" :key="hour" class="hour" :style="{height: size+'px'}">
          {{ (hour+7)%12 }}:00
        </div>
      </div>
        <div v-for="day in days" :key="day">
          <h2>{{ daysMap[day] }}</h2>
          <Day :dayData="schedule[day]" :size="size" />
        </div>
      </div>
      <div class="btns">
        <button @click="size++">increase size</button>
        <button @click="size--">decrease size</button>
      </div>
    </div>
  </template>
  

<script setup>
import { ref, computed } from 'vue'
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
    default: 127
  }
})
const size = ref(props.size);
const schedule = computed(() => props.schedule);

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
.btns{
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 150px;
  left:50px;
  gap:10px
}
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
  padding-right: 10px;
}

.hour {
  display: flex;
  align-items: flex-start;
}

.schedule-column {
  display: flex;
  flex: 1;
}
</style>

