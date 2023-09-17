<template>
    <div class="lecture">
      <h3>{{ lectureData.title }}</h3>
      <p>الوقت: {{ readableTime(lectureData.starttime) }} - {{ readableTime(lectureData.endtime) }}</p>
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
  const readableTime = (time) => {
    return `${time.getHours()}:${time.getMinutes()<10?'0':''}${time.getMinutes()}`
  }
  </script>
  
  <style scoped>
  .lecture {
      border: 1px solid #ddd;
      padding: 5px;
      margin: 5px 0;
  }
  </style>
  