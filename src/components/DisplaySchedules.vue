<template>
  <Carousel :value="schedules" :num-visible="1" :num-scroll="1" >
    <template #item="slotProps">
      <div class="border-1 surface-border border-round ">
          <ScheduleComponent :schedule="slotProps.data" size="small" />
      </div>
    </template>
  </Carousel>
</template>

<script setup>
import Carousel from 'primevue/carousel'
import ScheduleComponent from '../components/ScheduleComponent.vue'

defineProps({
  schedules: {
    type: Array,
    required: true
  }
})
</script>
<style scoped>
.p-carousel {
  direction: ltr;
}
.p-carousel-container {
  width: 50vw;
  height: 50vh;
}



</style>
