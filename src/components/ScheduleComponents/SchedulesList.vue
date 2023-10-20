<template>
<div class="flex flex-column items-center">
      <h2>
        عدد الجداول الممكنة <span class="text-blue-600 mr-2">{{ schedules.length }}</span>
      </h2>
      <div class="flex flex-wrap justify-content-center">
        <div v-for="schedule in schedules" :key="schedule.id">
          <ScheduleComponent :schedule="schedule" size="small" />
        </div>
      </div>
</div>
</template>

<script setup>
import ScheduleComponent from './ScheduleComponent.vue';

const props = defineProps({
  schedules: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>

</style>