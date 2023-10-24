<template>
    <div class="flex flex-column items-center">
        <h2>
          عدد الجداول الممكنة <span class="text-blue-600 mr-2">{{ schedules.length }}</span>
        </h2>
        <div class="flex flex-wrap justify-content-center gap-2">
          <div v-for="(schedule, index) in sortedSchedules" :key="index">
            <ScheduleComponent v-if="index < displayedCount" :schedule="schedule" size="small" />
          </div>
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref, watchEffect, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import {SCHEDULES_PER_PAGE} from '@/utils/constants'

const ScheduleComponent = defineAsyncComponent(() => import('@/components/ScheduleComponents/ScheduleComponent.vue'))

const props = defineProps({
  schedules: {
    type: Array,
    required: true
  },
})
const sortedSchedules = computed(() => {
  return [...props.schedules].sort((a, b) => a.meta.timings.timeDiff - b.meta.timings.timeDiff);
});
const displayedCount = ref(SCHEDULES_PER_PAGE)

const { y } = useWindowScroll()

// Watch for scroll changes
watchEffect(() => {
  // Check if we've scrolled to the bottom
  if (window.innerHeight + y.value >= (document.body.offsetHeight - 100)) {
    displayedCount.value += SCHEDULES_PER_PAGE;
  }
})
</script>

<style lang="scss" scoped>
</style>
