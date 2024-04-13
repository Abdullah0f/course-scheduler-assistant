import { defineStore } from 'pinia'
import { Plan } from '../utils/interfaces'
export const usePlanStore = defineStore('plan', {
  state: ( ): { plan: Plan } => ({
    plan: {
      terms: [],
      meta: {
        totalTerms: 0,
        totalCourses: 0,
        finishedCourses: 0,
        finishedTerms: 0
      }
    }
  }),
  actions: {
    setPlan(newPlan : Plan) {
      this.plan = newPlan
      console.log(this.plan)
    }
  },
  getters: {
    getFinishedCoursesCodes() : string[]  {
      const coursesCodes: string[] = [] 
      this.plan.terms.forEach((term) => {
        term.courses.forEach((course) => {
          if (course.status === 'Finished') coursesCodes.push(course.courseCode)
        })
      })
      return coursesCodes
    },
    getZeroCourses() : string[] {
      const coursesCodes: string[] = [] 
      this.plan.terms.forEach((term) => {
        term.courses.forEach((course) => {
          if (course.zeroCourse) coursesCodes.push(course.courseCode)
        })
      })
      return coursesCodes
    }
  },
  persist: true
})
