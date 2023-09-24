// store.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    selectedGender: null,
    selectedCity: null,
    selectedCollege: null,
  }),

  actions: {
    setSelectedGender(gender) {
      this.selectedGender = gender;
    },

    setSelectedCity(city) {
      this.selectedCity = city;
    },
    setSelectedCollege(college) {
      this.selectedCollege = college;
    },
  },
});
