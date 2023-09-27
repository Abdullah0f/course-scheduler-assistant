<template>
  <h1>الجدول</h1>
  <Schedule :schedule="schedule" />
  <ChooseCourses :courses="transformedCourses" v-if="Object.keys(courses).length !== 0" @submit-courses="handleCourses"/>
  <div v-if="schedules" class="flex flex-column items-center">
      <div v-for="schedule in schedules" :key="schedule.id">
        <Schedule :schedule="schedule" />
      </div>
  </div>
</template>

<script setup>
import {schedule} from '../../schedule.js'
import Schedule from '../components/Schedule.vue';
import {generateSchedules} from '../utils/generateSchdules.js'
import ChooseCourses from '../components/chooseCourses.vue';
import { useCoursesStore } from '../stores/courses'
import { ref, computed } from 'vue'
const schedules = ref(null)
const courses = useCoursesStore().courses;
const transformedCourses = computed(() => {
    return Object.keys(courses).map(key => ({ name: courses[key][0].name, code: key }));
});
console.log(Object.keys(courses).length === 0)

function handleCourses(selectedCourses){
  const selectedCoursesObject = selectedCourses.reduce((acc, courseCode) => {
    acc[courseCode] = courses[courseCode];
    return acc;
  }, {});
  schedules.value = generateSchedules(selectedCoursesObject);
}
</script>

<style scoped>
</style>