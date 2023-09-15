<template>
    <div class="day">
      <h2>{{ dayName }}</h2>
      <div v-for="lecture in dayData" :key="lecture.starttime">
        <Lecture :lectureData="lecture" />
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
  
  <style scoped>
  .day {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px 0;
  }
  </style>
  