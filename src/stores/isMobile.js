import { useWindowSize } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useIsMobileStore = defineStore('isMobile', () => {
  const isMobile = computed(() => useWindowSize().width.value <= 600)
  return { isMobile }
})
