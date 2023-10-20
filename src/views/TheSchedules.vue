<template>
  <div class="">
    <h1>الجدول</h1>
    <div>
      <Button
        rounded
        outlined
        severity="info"
        size="small"
        v-styleclass="{ selector: '@next', toggleClass: 'hidden' }"
        icon="pi pi-circle"
      />
      <ScheduleComponent :schedule="schedule" class="hidden" size="default" />
    </div>
    <ChooseCourses
      :courses="transformedCourses"
      v-if="Object.keys(courses).length !== 0"
      @submit-courses="handleCourses"
    />
    <ChooseFilters />
    <div v-if="schedules" class="flex flex-column items-center">
      <h2>
        عدد الجداول الممكنة <span class="text-blue-600 mr-2">{{ schedules.length }}</span>
      </h2>
      <div v-for="schedule in schedules" :key="schedule.id">
        <ScheduleComponent :schedule="schedule" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { schedule } from '../../schedule.js'
import ScheduleComponent from '@/components/ScheduleComponents/ScheduleComponent.vue'
import { generateSchedules } from '@/utils/generateSchdules.js'
import ChooseCourses from '@/components/ScheduleComponents/chooseCourses.vue'
import ChooseFilters from '@/components/ScheduleComponents/ChooseFilters.vue'
import { useCoursesStore } from '@/stores/courses'
import Button from 'primevue/button'
import { ref, computed } from 'vue'
const schedules = ref(null)
const courses = useCoursesStore().courses
const transformedCourses = computed(() => {
  return Object.keys(courses).map((key) => ({ name: courses[key][0].name, code: key }))
})

function handleCourses(selectedCourses) {
  const selectedCoursesObject = selectedCourses.reduce((acc, courseCode) => {
    acc[courseCode] = courses[courseCode]
    return acc
  }, {})
  schedules.value = generateSchedules(selectedCoursesObject)
}
</script>

<style scoped></style>
