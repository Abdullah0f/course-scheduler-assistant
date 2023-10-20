<template>
  <div class="hours-column">
    <h2>وقت</h2>
    <div class="hours">
      <div
        v-for="i in timings.timeDiff + 1"
        :key="i"
        class="hour"
        :style="{ height: hourPixels + 'px' }"
      >
      <span class="hour-label">{{ readableTime(timings.earliestTime.getHours() + i - 1) }}:00</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  hourPixels: {
    type: Number,
    required: true
  },
  timings: {
    type: Object,
    required: true
  }
})
const readableTime = (time) => time>12? time-12 : time;
</script>

<style lang="scss" scoped>
.hours-column {
  display: flex;
  flex-direction: column;
  padding-right: 10px;
}

.hour {
  display: flex;
  align-items: flex-start;
  position: relative;
  box-sizing: border-box;
  &:first-child .hour-label {
    transform: translateY(-10%);
  }
  &:last-child {
    height: 0 !important;
    .hour-label {
      transform: translateY(-110%);
    }
  }
}

.hours-column {
  .hour-label {
    position: absolute;
    top: 0px;
    left: 0;
    transform: translateY(-50%); // Moving it up by its own height
    padding: 0 5px; // optional padding
  }
  @media screen and (max-width: 600px) {
    padding-right: 0;
    .hour-label {
      font-size: 0.7rem;
    }
  }
}
.small .hours-column {
  padding-right: 0;
  .hour-label {
    font-size: 0.8rem;
  }
}
</style>
