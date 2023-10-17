<template>
  <div
    class="lecture hide-scrollbar"
    :style="{ top: lectureTop + 'px', height: lectureHeight + 'px' }"
  >
    <h3>{{ lectureData.title }}</h3>

    <div>
      <p v-if="!isMobile">
        الوقت: {{ readableTime(lectureData.startTime) }} - {{ readableTime(lectureData.endTime) }}
      </p>
      <p v-if="showFullData">القاعة: {{ lectureData.location }}</p>
      <p v-if="!isMobile && showFullData">النوع: {{ lectureData.classType }}</p>
      <p v-if="showFullData">المحاضر: {{ lectureData.instructor }}</p>
    </div>

    <!-- Start Time (Mobile Only) -->
    <div class="top-0 right-0 absolute px-1 block" v-if="isMobile">
      <p>{{ readableTime(lectureData.startTime) }}</p>
    </div>

    <!-- End Time (Mobile Only) -->
    <div class="bottom-0 left-0 absolute px-1 block" v-if="isMobile">
      <p>{{ readableTime(lectureData.endTime) }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { isMobileFunc } from '../utils/helpers'
import { useWindowSize } from '@vueuse/core'
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
const lectureTop = computed(() => {
  const hourDiff = props.lectureData.startTime.getHours() - props.timings.earliestTime.getHours()
  const totalMinutes = hourDiff * 60 + props.lectureData.startTime.getMinutes()
  return props.hourPixels * (totalMinutes / 60)
})
const windowSize = useWindowSize()
const isMobile = computed(()=> isMobileFunc(windowSize.width.value))

const totalDurationInMinutes = computed(()=>{
const durationInMinutes = 
  props.lectureData.endTime.getMinutes() - props.lectureData.startTime.getMinutes();
  const durationInHours =
    props.lectureData.endTime.getHours() - props.lectureData.startTime.getHours()
  return durationInHours * 60 + durationInMinutes
});

const showFullData = computed(() => totalDurationInMinutes.value > 90)

const lectureHeight = computed(() => {
  
  return (totalDurationInMinutes.value / 60) * props.hourPixels
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
  width: -moz-available;
  width: fill-available;
  @media screen and (max-width: 600px) {
    h3 {
      font-size: 0.5rem;
    }
    p {
      font-size: 0.3rem;
    }
  }
}
.small .lecture {
  h3 {
    font-size: 0.6rem;
  }
  p {
    font-size: 0.5rem;
  }
}
</style>
