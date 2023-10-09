<template>
    <div class="schedule" :class="props.size">
      <HourColumn v-if="!isMobile"  :hourPixels="hourPixels" :timings="timings"/>
        <div v-for="day in DAYS" :key="day" class="flex-1">
          <h2 class="text-center">{{ DAYS_MAP[day] }}</h2>
          <Day :dayData="schedule[day]" :hourPixels="hourPixels" :timings="timings" />
        </div>
      </div>
  </template>
  


<script setup>
import HourColumn from './HourColumn.vue';
import Day from './Day.vue'
import { computed ,ref, provide} from 'vue'
import {DAYS_MAP, DAYS, SIZE_PIXELS_MAP} from '../utils/constants'
import { getTimings } from '../utils/scheduleHelpers';
import {isMobileFunc} from '../utils/helpers'
import {useWindowSize} from '@vueuse/core'
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
const isMobile = computed(()=> isMobileFunc(useWindowSize().width.value))
const device = computed(() => isMobile.value? 'mobile' : 'other');
const hourPixels = computed(() => SIZE_PIXELS_MAP[device.value][props.size]);

</script>


<style lang="scss">

.schedule {
  border: 1px solid #aaa;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  width: 80vw;
  max-width: 1100px;
  min-width: 800px;
  // for phones
  @media screen and (max-width: 600px) {
    width: 100vw;
    max-width: 600px;
    min-width: 0px;
    padding: 2px;
    h2 {
      font-size: 0.7rem;
    }
  }
}
.schedule.small {
  width: 30vw;
  min-width: 350px;
  max-width: 600px;

  h2 {
    font-size: 1rem;
  }

}

</style>

