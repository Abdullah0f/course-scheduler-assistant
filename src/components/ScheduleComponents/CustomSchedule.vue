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
import { ref, watch } from 'vue'
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import Schedule from '../../classes/Schedule.ts';

const props = defineProps({
    selectedCourses: {
        type: Array,
        required: true
    }
})

const toast = useToast();
const currentlyAddedSections = ref([])
const schedule = ref(new Schedule())


const isEmpty = ref(true)




const handleAddSection = (section) => {

  if(schedule.value.canAddCourseOptionToSchedule(section)) {
    schedule.value = schedule.value.addCourseOptionToSchedule(section)
    schedule.value.addOrUpdateMeta()
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
  schedule.value.deleteSection(sectionCode)
  updateAddedSections(sectionCode)

}




const updateAddedSections = (deletedSection) => {
  currentlyAddedSections.value = currentlyAddedSections.value.filter((section) => section !== deletedSection)
}

watch(currentlyAddedSections, () => {
  if (currentlyAddedSections.value.length == 0) {
    isEmpty.value = true
    schedule.value = new Schedule()
  } else {
    schedule.value.addOrUpdateMeta()
  }

})


</script>

<style lang="scss" scoped>


</style>
