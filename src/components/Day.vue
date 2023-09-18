<template>
    <div class="day" :style="{height: (size*8)+'px'}">
        <div v-for="lecture in dayData" :key="lecture.starttime">
          <Lecture :lectureData="lecture" />
        </div>
    </div>
  </template>
  
  
  <script setup>
  import { inject } from 'vue'
  import Lecture from './Lecture.vue'
  
  const props = defineProps({
    dayData: {
      type: Array,
      required: true
    },
  })

  const size = inject('size')
  </script>
  
  <style scoped lang="scss">
  .day {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    position: relative;
    width: 200px;
    position: relative; // this is important to position the lectures inside
  }

  </style>
  
  
  