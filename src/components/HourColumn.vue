<template>
  <div class="hours-column">
    <h2>وقت</h2>
    <div class="hours">
        <div v-for="i in timings.timeDiff+1" :key="i" class="hour" :style="{ height: hourPixels + 'px' }">
            <span class="hour-label">{{ timings.earliestTime.getHours() + i -1 }}:00</span>
            <div class="hr-line" v-if="showLine"></div>
        </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  hourPixels: {
    type: Number,
    required: true,
  },
  showLine: {
    type: Boolean,
    required: false,
    default: true,
  },
  timings: {
    type: Object,
    required: true,
  }
});
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
    &:last-child{
        height: 0 !important;
    .hour-label {
        transform: translateY(-110%);
    }
}
}
.hour-label{
  position: absolute;
    top: 0px;
    left: 0;
    transform: translateY(-50%);  // Moving it up by its own height
    padding: 0 5px; // optional padding
  }

.hr-line{
  position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #aaa;
    width: 1100px;
}</style>
