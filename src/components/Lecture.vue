<template>
<div class="lecture" :style="{ top: lectureTop + 'px', height: lectureHeight+'px'}">
    <h3>{{ lectureData.title }}</h3>
    <p>
      الوقت: {{ readableTime(lectureData.starttime) }} - {{ readableTime(lectureData.endtime) }}
    </p>
    <p>القاعة: {{ lectureData.location }}</p>
    <p>النوع: {{ lectureData.classType }}</p>
    <p>المحاضر: {{ lectureData.instructor }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  lectureData: {
    type: Object,
    required: true
  },
  size:{
    type: Number,
    required: true,
  },
})
const PIXELS_PER_HOUR = computed(() => props.size);
const scheduleStartHour = 8;  // Assuming schedule starts at 8 AM

const calculateTop = (courseStartTime, scheduleStartTime) => {
  const differenceInHours = courseStartTime.getHours() - scheduleStartTime;
  return differenceInHours * PIXELS_PER_HOUR.value;
}

const calculateHeight = (courseStartTime, courseEndTime) => {
  const durationInHours = courseEndTime.getHours() - courseStartTime.getHours();
  const durationInMinutes = courseEndTime.getMinutes() - courseStartTime.getMinutes();
  const totalDurationInMinutes = (durationInHours * 60) + durationInMinutes;

  return (totalDurationInMinutes / 60) * PIXELS_PER_HOUR.value;
}
const lectureTop = computed(() => calculateTop(props.lectureData.starttime, scheduleStartHour));
const lectureHeight = computed(() => calculateHeight(props.lectureData.starttime, props.lectureData.endtime));
const readableTime = (time) => {
  return `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`
}
</script>
<style scoped lang="scss">
.lecture {
    border: 1px solid #ddd;
    padding: 5px;
    background-color: #f4f4f4;
    position: absolute;
    box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
    overflow: hidden;
}
</style>

