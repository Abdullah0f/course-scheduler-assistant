<template>
    <div class="schedule">
      <HourColumn :size="size" :showLine="showLine"/>
        <div v-for="day in DAYS" :key="day">
          <h2>{{ DAYS_MAP[day] }}</h2>
          <Day :dayData="schedule[day]" :size="size" />
        </div>
      </div>
      <div class="btns">
        <button @click="size+=changeAmount">increase size</button>
        <button @click="size=127">reset, current: {{ size }}</button>
        <button @click="size-=changeAmount">decrease size</button>
        <input type="number" v-model="changeAmount" placeholder="changeAmount">
        <button @click="showLine=!showLine">toggle line</button>
      </div>
  </template>
  

<script setup>
import { ref } from 'vue'
import Day from './Day.vue'
import {DAYS_MAP, DAYS} from '../config/constants'
import HourColumn from './HourColumn.vue';
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
const size_mapping = {
  'default': 127,
  'small': 100,
  'large': 200
}
// const PIXELS_PER_HOUR = computed(() => size_mapping[props.size]);
const showLine = ref(true);
const changeAmount = ref(1);
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
</style>

