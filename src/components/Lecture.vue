<template>
    <div class="lecture">
      <h3>{{ lectureData.title }}</h3>
      <p>الوقت: {{ lectureData.starttime }} - {{ lectureData.endtime }}</p>
      <p>القاعة: {{ lectureData.location }}</p>
      <p>النوع: {{ lectureData.classType }}</p>
      <p>المحاضر: {{ lectureData.instructor }}</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    lectureData: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .lecture {
      border: 1px solid #ddd;
      padding: 5px;
      margin: 5px 0;
  }
  </style>
  