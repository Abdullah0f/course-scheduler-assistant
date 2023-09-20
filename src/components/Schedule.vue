<template>
    <div class="schedule">
      <HourColumn :hourPixels="hourPixels" :timings="timings" :showLine="showLine"/>
        <div v-for="day in DAYS" :key="day">
          <h2>{{ DAYS_MAP[day] }}</h2>
          <Day :dayData="schedule[day]" :hourPixels="hourPixels" :timings="timings" />
        </div>
      </div>
      <div class="btns">
        <button @click="hourPixels+=changeAmount">increase size</button>
        <button @click="hourPixels=127">reset, current: {{ hourPixels }}</button>
        <button @click="hourPixels-=changeAmount">decrease size</button>
        <input type="number" v-model="changeAmount" placeholder="changeAmount">
        <button @click="showLine=!showLine">toggle line</button>
      </div>
  </template>
  

<script setup>
import HourColumn from './HourColumn.vue';
import Day from './Day.vue'
import { ref, computed } from 'vue'
import {DAYS_MAP, DAYS, SIZE_PIXELS_MAP} from '../utils/constants'
import { getTimings } from '../utils/scheduleHelpers';
const props = defineProps({
  schedule: {
    type: Object,
    required: true
  },
  size:{
    type: String,
    required: false,
    default: 'default',
    validator: (value) => {
      return ['default', 'small'].includes(value);
    }
  }
})
const timings = computed(()=> getTimings(props.schedule));

// its ref(127) in order for debugging btns to work, otherwise it should be computed(() => SIZE_PIXELS_MAP[props.size]);
const hourPixels = ref(127)//computed(() => SIZE_PIXELS_MAP[props.size]);


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

