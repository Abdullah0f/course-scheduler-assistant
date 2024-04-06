import { defineStore } from 'pinia'

export const usePlanStore = defineStore('plan', {
  state: () => ({
    plan: []
  }),
  actions: {
    setPlan(newPlan) {
      this.plan = newPlan
      console.log(this.plan)
    }
  },
  getters: {
    getFinishedCoursesCodes() {
      const coursesCodes = []
      this.plan.terms.forEach((term) => {
        term.courses.forEach((course) => {
          if (course.status === 'Finished') coursesCodes.push(course.courseCode)
        })
      })
      return coursesCodes
    }
  },
  persist: true
})
