<template>
    <div>
        <h1>انشئ جدولك الخاص</h1>

        <div class="flex gap-5 flex-row-reverse">
            <div>
                <ScheduleComponent :schedule="schedule" size="default" :empty="isEmpty"  />
            </div>
            <div class="w-full mt-2 border-round-2xl border-1">
              <CoursesSectionView :selectedCourses="props.selectedCourses" :currentSchedule="schedule" @add-section="handleAddSection"
                @delete-section="handleDeleteSection" :currentlyAddedSections="currentlyAddedSections"
              />

            </div>
        </div>
    </div>
    <Toast />
</template>

<script setup>
import ScheduleComponent from './ScheduleComponent.vue';
import CoursesSectionView from './CoursesSectionView.vue';
import ChooseCourses from './ChooseCourses.vue';
import { ref,onMounted,computed, watch } from 'vue'

import { canAddCourseOptionToSchedule, addCourseOptionToSchedule ,addMetaToSchedule,initializeBlankSchedule,updateScheduleMeta } from '@/utils/generateSchdules';
import { deleteSectionFromSchedule } from '@/utils/scheduleHelpers';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';

const props = defineProps({
    selectedCourses: {
        type: Array,
        required: true
    }
})

const toast = useToast();
const currentlyAddedSections = ref([])
const schedule = ref(initializeBlankSchedule())


const isEmpty = ref(true)




const handleAddSection = (section) => {

  if(canAddCourseOptionToSchedule(section, schedule.value)) {
    schedule.value = addCourseOptionToSchedule(section, schedule.value)
    schedule.value.meta ? addMetaToSchedule(schedule.value) : updateScheduleMeta(schedule.value)
    currentlyAddedSections.value.push(section.classCode)
    isEmpty.value = false
  } else {
    toast.removeAllGroups()
    toast.add({
      severity: "error",
      summary: "لا يمكن اضافة هذه الشعبة للجدول الحالي بسبب وجود تعارض", 
      life: 3000,
    })
  }
}
const handleDeleteSection = (sectionCode) => {
  schedule.value = deleteSectionFromSchedule(sectionCode, schedule.value)
  updateAddedSections(sectionCode)

}




const updateAddedSections = (deletedSection) => {
  currentlyAddedSections.value = currentlyAddedSections.value.filter((section) => section !== deletedSection)
}

watch(currentlyAddedSections, () => {
  if (currentlyAddedSections.value.length == 0) {
    isEmpty.value = true
    schedule.value = initializeBlankSchedule()
  } else {
    updateScheduleMeta(schedule.value)
  }

})


</script>

<style lang="scss" scoped>


</style>
