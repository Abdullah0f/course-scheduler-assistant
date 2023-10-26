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
  <div v-if="schedules">
    <ChooseSort :sort="sort"  @sort-changed="updateSort" class="mr-5"/>
    <SchedulesList :schedules="sortedSchedules" />
  </div>
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
import ChooseSort from '@/components/ScheduleComponents/chooseSort.vue'
import { sortSchedules } from '@/utils/scheduleHelpers.js'
const schedules = ref(null)
const courses = useCoursesStore().courses
const transformedCourses = computed(() => {
  return Object.keys(courses).map(key => ({ name: courses[key][0].code +" | "+courses[key][0].name, code: key }));
})
const sort = ref("timeDiff-asc")

const selectedCourses = ref([])
const updateSelectedCourses = courses => selectedCourses.value = courses


const sortedSchedules = computed(() => sortSchedules(schedules.value, sort.value));
const filters = ref({
  allowLocked: false,
  daysOff: 0,
  offInTheseDays: [],
  breaksLimit: 100,
})
const updateFilters = newFilters => filters.value = newFilters


const updateSort = newSort => sort.value = newSort

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
