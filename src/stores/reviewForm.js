import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useReviewFormStore = defineStore(
  'reviewForm',
  () => {
    const userHasReviewed = ref(false)
    const userReviewd = () => (userHasReviewed.value = true)

    return { userHasReviewed, userReviewd }
  },
  { persist: true }
)
