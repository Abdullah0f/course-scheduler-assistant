<template>
    <div class="day" :style="{height: height+'px'}">
        <div v-for="lecture in dayData" :key="lecture.starttime">
          <Lecture :lectureData="lecture" :size="size"/>
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
    size:{
      type: Number,
      required: true,
    }
  })
  const startTime = 8;
  const endTime = 15;
  const height = computed(() => props.size*(endTime-startTime));
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
  
  
  
