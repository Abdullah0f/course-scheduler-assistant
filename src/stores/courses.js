import { defineStore } from 'pinia'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: {}
  }),
  actions: {
    setCourses(newCourse) {
      this.courses = newCourse
    },
  },
  persist: {
    enabled: true,
    debug: true,
    afterRestore: ({store}) => {
      for (let courseCode in store.courses) {
        let courseList = store.courses[courseCode];
        for (let course of courseList) {
          for (let period of course.periods) {
            period.startTime = new Date(period.startTime);
            period.endTime = new Date(period.endTime);
          }
        }
      }
    }
  }
})


