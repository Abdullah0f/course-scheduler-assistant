import { defineStore } from 'pinia'
import { collection, addDoc, query, where, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase/confing'
import getUser from '@/utils/auth/getUser'
import getCollection from '@/utils/database/getCollection'
import { timifySchedule } from '../utils/timifySchedule';

const { user } = getUser()
export const useScheduleStore = defineStore({
  id: 'schedulesStore',
  state: () => ({
    schedules: [],
  }),
  actions: {
    async loadUserSchedules() {
      try {
          const documents = await getCollection(
              'favourite_schedules',
              ['userID', '==', user.value.uid],
          )
            if (documents && documents.value) {
              this.schedules = documents.value.map(doc => doc.schedule)
          }
      } catch (error) {
          console.error("Error loading user schedules:", error);
      }
  },
    async bookSchedule(schedule) {
      this.schedules.push(schedule);
      const colRef = collection(db, 'favourite_schedules')
      await addDoc(colRef, {
        schedule: JSON.stringify(schedule),
        userID: user.value.uid,
        scheduleID : schedule.meta.id,
        createdAt: serverTimestamp()
      })
    },
    async unbookSchedule(schedule) {
      try {
        const q = query(
          collection(db, 'favourite_schedules'),
          where('userID', '==', user.value.uid),
          where('scheduleID', '==', schedule.meta.id)
        );
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          await deleteDoc(querySnapshot.docs[0].ref);
        }
    
        const index = this.schedules.findIndex(s => s.meta.id === schedule.meta.id);
        if (index !== -1) {
          this.schedules.splice(index, 1);
        }
      } catch (error) {
        console.error("Error in unbooking schedule: ", error);
      }
    },
    isBooked(schedule) {
      return this.schedules.some(s => s.meta.id === schedule.meta.id)
    }
  },
  persist: true

})

