<template>
    <div class="flex flex-column items-center">
        <h2>
          عدد الجداول الممكنة <span class="text-blue-600 mr-2">{{ schedules.length }}</span>
        </h2>
        <div class="flex flex-wrap justify-content-center">
          <div v-for="(schedule, index) in schedules" :key="index">
            <ScheduleComponent v-if="index < displayedCount" :schedule="schedule" size="small" />
          </div>
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref, watchEffect } from 'vue'

const ScheduleComponent = defineAsyncComponent(() => import('@/components/ScheduleComponents/ScheduleComponent.vue'))

const { schedules } = defineProps(['schedules'])

const displayedCount = ref(0)

// This watcher progressively adds schedules to the display list with a delay
watchEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < schedules.length) { 
        displayedCount.value = currentIndex + 100
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 20) // Adjust this delay as per your needs
})
</script>

<style lang="scss" scoped>
</style>
