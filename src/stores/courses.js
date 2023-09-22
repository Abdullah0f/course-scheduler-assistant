import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref({})
  const setCourses = (newCourses) => {
    courses.value = newCourses
  }
  const coursesGetter = computed(() => courses.value)
  return { courses: coursesGetter, setCourses }
})
