import { defineStore } from 'pinia'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    schedules: [] // Now an array
  }),
  actions: {
    saveSchedule(newSchedule) {
      // console.log(newSchedule);

      const existingIndex = this.schedules.findIndex((s) => s.meta.id === newSchedule.meta.id) // Assuming each schedule has a unique 'id'
      console.log(existingIndex)
      if (existingIndex === -1) {
        // Schedule not found, add it
        this.schedules.push(newSchedule)
      } else {
        // Schedule found, remove it
        this.schedules.splice(existingIndex, 1)
      }

      // Update local storage
      localStorage.setItem('schedules', JSON.stringify(this.schedules))
    },
    loadSchedules() {
      const savedSchedules = localStorage.getItem('schedules')
      if (savedSchedules) {
        this.schedules = JSON.parse(savedSchedules)
      }
    }
  }
})
