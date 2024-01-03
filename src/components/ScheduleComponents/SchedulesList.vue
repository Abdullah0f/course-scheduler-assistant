<template>
  <div class="flex flex-column items-center">
    <h2 class="mr-5">
      عدد الجداول الممكنة <span class="text-blue-600 mr-2">{{ schedules.length }}</span>
    </h2>
    <div v-if="schedules.length == 0">
      <h3 class="text-2xl text-center text-black-alpha-60">
        يرجى تغيير المواد المختارة او الفلاتر
      </h3>
    </div>
    <div class="flex flex-wrap justify-content-center gap-2">
      <div v-for="(schedule, index) in schedules" :key="index">
        <ScheduleComponent v-if="index < displayedCount" :schedule="schedule" size="small" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, watchEffect, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { SCHEDULES_PER_PAGE } from '@/utils/constants'

// lazy loding the schedule component
const ScheduleComponent = defineAsyncComponent(() =>
  import('@/components/ScheduleComponents/ScheduleComponent.vue')
)

const props = defineProps({
  schedules: {
    type: Array,
    required: true
  }
})

const displayedCount = ref(SCHEDULES_PER_PAGE)

const { y } = useWindowScroll()

// Watch for scroll changes
watchEffect(() => {
  // Check if we've scrolled to the bottom
  if (window.innerHeight + y.value >= document.body.offsetHeight - 100) {
    displayedCount.value += SCHEDULES_PER_PAGE
  }
})
</script>

<style lang="scss" scoped></style>
