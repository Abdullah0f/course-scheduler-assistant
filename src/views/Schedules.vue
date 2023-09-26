<template>
  <h1>الجدول</h1>
  <Schedule :schedule="schedule" />
  <ChooseCourses :courses="courses" v-if="courses.length" @submit-courses="handleCourses"/>
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
import { ref } from 'vue'
function transformCourses(coursesObj) {
  const coursesArray = [];
  for (const [code, value] of Object.entries(coursesObj)) {
    coursesArray.push({
      name: value[0].name,
      code,
      value
    });
  }
  return coursesArray;
}
function convertToOldStructure(selectedCourses) {
  const oldStructure = {};
  selectedCourses.forEach(course => {
    oldStructure[course.code] = course.value;
  });
  return Object.values(oldStructure);
}

const schedules = ref(null)
const coursesStore = useCoursesStore().courses;
const courses = transformCourses(coursesStore);

function handleCourses(selectedCourses){
  const oldFormatCourses = convertToOldStructure(selectedCourses);
  console.log(oldFormatCourses)
  schedules.value = generateSchedules(oldFormatCourses);
}
</script>

<style scoped>
</style>