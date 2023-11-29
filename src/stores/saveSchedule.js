import { defineStore } from 'pinia'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    schedules: [] 
  }),
  actions: {
    saveSchedule(newSchedule) {
      const existingIndex = this.schedules.findIndex((s) => s.meta.id === newSchedule.meta.id) 
      if (existingIndex === -1) {
        // Schedule not found, add it
        this.schedules.push(newSchedule)
      } else {
        // Schedule found, remove it
        this.schedules.splice(existingIndex, 1)
      }
    },
    isBooked(newSchedule) {
      return this.schedules.findIndex((s) => s.meta.id === newSchedule.meta.id)  != -1
      },
      loadSchedules() {
        const schedules = JSON.parse(localStorage.getItem('schedules'))
        if (schedules) {
          this.schedules = schedules
        }
      }
  },
  persist: true

})
