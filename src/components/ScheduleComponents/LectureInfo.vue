<template >
  <div style="color: black;">
    <p class="font-bold text-center	">
      الشعبة: {{ lectureData.classCode }} <i :class="classTypeIcon"></i>
        </p>
        <p v-if="!isMobile" class="-mb-1">
          <i class="pi pi-stopwatch" style="font-size: inherit;"> </i> {{ readableTime(lectureData.startTime) }} - {{ readableTime(lectureData.endTime) }}
        </p>
        <p  class="-mb-1">
          <i class="pi pi-map-marker" style="font-size:inherit"></i> {{ lectureData.location }}
        </p>
        <p >
          <i class="fa-solid fa-user-tie" style="font-size:inherit"></i> {{ lectureData.instructor }}
        </p>
  </div>

</template>

<script setup>
import { computed } from 'vue'
import { isMobileFunc } from '@/utils/helpers'
import { useWindowSize } from '@vueuse/core'

const props = defineProps({
  lectureData: {
    type: Object,
    required: true
  }
})

const windowSize = useWindowSize()

const isMobile = computed(() => isMobileFunc(windowSize.width.value))

const classTypeIcon = computed(() => {
   if (props.lectureData.classType == 'عملي')
    return 'fa-solid fa-microscope'
  else if (props.lectureData.classType == 'تمارين')
  return 'fa-solid fa-file-pen'
  else 
    return 'fa-solid fa-person-chalkboard'
})

const readableTime = (time) => {
  return `${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')}`
}
</script>

<style scoped lang="scss">

</style>