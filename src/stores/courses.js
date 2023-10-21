import { defineStore } from 'pinia'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: {}
  }),
  actions: {
    setCourses(newCourse) {
      this.courses = newCourse
    }
  },
  persist: true
})


