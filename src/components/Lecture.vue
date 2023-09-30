<template>
  <div class="lecture hide-scrollbar" :style="{ top: lectureTop + 'px', height: lectureHeight + 'px' }">
    <h3>{{ lectureData.title }}</h3>
    <p>
      الوقت: {{ readableTime(lectureData.startTime) }} - {{ readableTime(lectureData.endTime) }}
    </p>
    <p>القاعة: {{ lectureData.location }}</p>
    <p>النوع: {{ lectureData.classType }}</p>
    <p>المحاضر: {{ lectureData.instructor }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lectureData: {
    type: Object,
    required: true
  },
  hourPixels: {
    type: Number,
    required: true
  },
  timings: {
    type: Object,
    required: true
  }
})
const lectureTop = computed( () =>{
  const hourDiff = props.lectureData.startTime.getHours() - props.timings.earliestTime.getHours()
  const totalMinutes = hourDiff * 60 + props.lectureData.startTime.getMinutes()
   return  props.hourPixels * (totalMinutes / 60)
})


const lectureHeight = computed(() => {
  const durationInHours = props.lectureData.endTime.getHours() - props.lectureData.startTime.getHours()
  const durationInMinutes = props.lectureData.endTime.getMinutes() - props.lectureData.startTime.getMinutes()
  const totalDurationInMinutes = durationInHours * 60 + durationInMinutes
  return (totalDurationInMinutes / 60) * props.hourPixels
})
const readableTime = (time) => {
  return `${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')}`
}
</script>
<style scoped lang="scss">
.lecture {
  border: 1px solid #ddd;
  padding: 5px;
  background-color: #f4f4f4;
  position: absolute;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: scroll;
  width: -webkit-fill-available;
  @media screen and (max-width: 600px) {
    h3{
      font-size: 0.5rem;
    }
    p{
      font-size: 0rem;
    }
  }
}
.small .lecture {
  h3{
    font-size: 0.6rem;
  }
  p{
    font-size: 0.5rem;
  }
}
</style>
