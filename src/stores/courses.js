import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref({})
  const setCourses = (newCourses) => {
    courses.value = newCourses
    console.log(courses.value)
  }
  const coursesGetter = computed(() => courses.value)
  return { courses: coursesGetter, setCourses }
})
