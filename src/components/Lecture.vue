<template>
  <div
    class="lecture hide-scrollbar"
    :style="{ top: lectureTop + 'px', height: lectureHeight + 'px' }"
  >
    <h3>{{ lectureData.title }}</h3>

    <div v-if="!isMobile">
      <p>
        الوقت: {{ readableTime(lectureData.startTime) }} - {{ readableTime(lectureData.endTime) }}
      </p>
      <p>القاعة: {{ lectureData.location }}</p>
      <p>النوع: {{ lectureData.classType }}</p>
      <p>المحاضر: {{ lectureData.instructor }}</p>
    </div>

    <!-- Start Time (Mobile Only) -->
    <div class="start-time-mobile" v-if="isMobile">
      <p>{{ readableTime(lectureData.startTime) }}</p>
    </div>

    <!-- End Time (Mobile Only) -->
    <div class="end-time-mobile" v-if="isMobile">
      <p>{{ readableTime(lectureData.endTime) }}</p>
    </div>
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
const lectureTop = computed(() => {
  const hourDiff = props.lectureData.startTime.getHours() - props.timings.earliestTime.getHours()
  const totalMinutes = hourDiff * 60 + props.lectureData.startTime.getMinutes()
  return props.hourPixels * (totalMinutes / 60)
})

const isMobile = computed(() => {
  // Check if the screen width is less than or equal to 600px (adjust as needed)
  return window.innerWidth <= 600
})

const lectureHeight = computed(() => {
  const durationInHours =
    props.lectureData.endTime.getHours() - props.lectureData.startTime.getHours()
  const durationInMinutes =
    props.lectureData.endTime.getMinutes() - props.lectureData.startTime.getMinutes()
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
    h3 {
      font-size: 0.5rem;
    }
    p {
      font-size: 0.3rem;
    }
  }
}

.start-time-mobile,
.end-time-mobile {
  padding: 0 3px;
  display: block;
  position: absolute;
}

.start-time-mobile {
  top: 0;
  right: 0;
}

.end-time-mobile {
  bottom: 0;
  left: 0;
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
