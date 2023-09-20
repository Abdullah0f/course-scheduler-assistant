<template>
    <div class="day" :style="{height: height+'px'}">
        <div v-for="lecture in dayData" :key="lecture.starttime">
          <Lecture :lectureData="lecture" :hourPixels="hourPixels" :timings="timings"/>
        </div>
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
    padding: 10px;
    margin: 10px 0;
    position: relative;
    width: 200px;
    position: relative;
  }

  </style>
  
  
  
