<template>
    <div class="day" :style="{height: height+'px'}">
          <Lecture class="mx-1" v-for="lecture in dayData" :key="lecture.startTime" :lectureData="lecture" :hourPixels="hourPixels" :timings="timings"/>
    </div>
  </template>
  
  
  <script setup>
  import { computed } from 'vue'
  import Lecture from './Lecture.vue'
  
  const props = defineProps({
    dayData: {
      type: Array,
      required: true
    },
    hourPixels:{
      type: Number,
      required: true,
    },
    timings: {
      type: Object,
      required: true,
    }
  })
  const height = computed(() => props.hourPixels*(props.timings.timeDiff));
  </script>
  
  <style scoped lang="scss">
  .day {
    border: 1px solid #ccc;
    margin: 10px 0;
    position: relative;
  }
  </style>
  
  
  
