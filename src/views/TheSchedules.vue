<template>
  <div class="mr-5">

  <div id="temp">
    <h1>الجدول</h1>
    <Button
    rounded
    outlined
    severity="info"
    size="small"
    v-styleclass="{ selector: '@next', toggleClass: 'hidden' }"
    icon="pi pi-circle"
    ></Button>
    <div class="hidden">
      <ScheduleComponent :schedule="schedule" size="default" />
    </div>
  </div>
  <div v-if="Object.keys(courses).length !== 0">
  
  <ChooseCourses
  :courses="transformedCourses"
  @courses-changed="updateSelectedCourses"
  />

  <ChooseFilters
  @filters-changed="updateFilters"
  :filters="filters"
  />
  <Button class="w-max mt-3" label="تاكيد" @click="handleCourses"></Button>
  </div>
</div>

  <SchedulesList v-if="schedules" :schedules="schedules" />
</template>

<script setup>
import { schedule } from '../../schedule.js'
import ScheduleComponent from '@/components/ScheduleComponents/ScheduleComponent.vue'
import { generateSchedules } from '@/utils/generateSchdules.js'
import { resetColors } from '@/utils/getColor.js'
import ChooseCourses from '@/components/ScheduleComponents/chooseCourses.vue'
import ChooseFilters from '@/components/ScheduleComponents/ChooseFilters.vue'
import SchedulesList from '@/components/ScheduleComponents/SchedulesList.vue'
import { useCoursesStore } from '@/stores/courses'
import Button from 'primevue/button'
import { ref, computed } from 'vue'

const schedules = ref(null)
const courses = useCoursesStore().courses
const transformedCourses = computed(() => {
  return Object.keys(courses).map(key => ({ name: courses[key][0].code +" | "+courses[key][0].name, code: key }));
})

const selectedCourses = ref([])
const updateSelectedCourses = courses => selectedCourses.value = courses

const filters = ref({
  allowLocked: false,
  daysOff: 0,
  offInTheseDays: [],
  breaksLimit: -1,
})
const updateFilters = newFilters => filters.value = newFilters

function handleCourses() {
  if(!selectedCourses.value.length) return;
  resetColors();
  const selectedCoursesObject = selectedCourses.value.reduce((acc, courseCode) => {
    acc[courseCode] = courses[courseCode]
    return acc
  }, {})
  schedules.value = generateSchedules(selectedCoursesObject, filters.value)
}
</script>

<style scoped></style>
