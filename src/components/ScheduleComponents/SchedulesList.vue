<template>
    <div class="flex flex-column items-center">
        <h2>
          عدد الجداول الممكنة <span class="text-blue-600 mr-2">{{ schedules.length }}</span>
        </h2>
        <div class="flex flex-wrap justify-content-center gap-2">
          <div v-for="(schedule, index) in schedules" :key="index">
            <ScheduleComponent v-if="index < displayedCount" :schedule="schedule" size="small" />
          </div>
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref, watchEffect } from 'vue'
import {SCHEDULES_LIST_INTERVAL_WAIT_MS, SCHEDULES_LIST_CHUNKS_PER_TIME_UNIT} from '@/utils/constants'
const ScheduleComponent = defineAsyncComponent(() => import('@/components/ScheduleComponents/ScheduleComponent.vue'))

const { schedules } = defineProps(['schedules'])

const displayedCount = ref(0)

// This watcher progressively adds schedules to the display list with a delay
watchEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < schedules.length) { 
        currentIndex += SCHEDULES_LIST_CHUNKS_PER_TIME_UNIT; // Add 100 to the current index
        displayedCount.value = Math.min(currentIndex, schedules.length); // Use Math.min to avoid overshooting
      } else {
        clearInterval(interval)
      }
    }, SCHEDULES_LIST_INTERVAL_WAIT_MS) // Adjust this delay as per your needs
})
</script>

<style lang="scss" scoped>
</style>
