<template>
    <div class="day">
      <h2>{{ dayName }}</h2>
      <div class="lectures-container">
        <div v-for="lecture in dayData" :key="lecture.starttime">
          <Lecture :lectureData="lecture" />
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import Lecture from './Lecture.vue'
  
  const props = defineProps({
    dayData: {
      type: Array,
      required: true
    },
    dayName: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped lang="scss">
  .day {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    position: relative;
    width: 200px;
  }
  
  .lectures-container {
    position: relative; // this is important to position the lectures inside
    height: 720px; // this assumes each pixel is a minute, and the timeframe is 12 hours
  }
  </style>
  
  
  