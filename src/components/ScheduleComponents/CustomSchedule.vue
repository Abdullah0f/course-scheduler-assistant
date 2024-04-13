<template>
    <div>
        <h1>انشئ جدولك الخاص</h1>

        <div class="flex gap-5 flex-row-reverse">
            <div>
                <ScheduleComponent :schedule="schedule" size="default" :empty="isEmpty"  />
            </div>
            <div class="w-full mt-2 border-round-2xl border-1">
              <CoursesSectionView :selectedCourses="props.selectedCourses" :currentSchedule="schedule" :currentlyAddedCourses="currentlyAddedCourses" @add-section="handleAddSection"
                @delete-section="handleDeleteSection" :currentlyAddedSections="currentlyAddedSections"
              />

            </div>
        </div>
    </div>
    <Dialog v-model:visible="showConflictDialog" :draggable="false" modal style="max-width: min-content;"  >
        <template #header>
                <h2 class="text-center text-red-500">تعارض في الجدول</h2>
        </template>
        <ConflictDialog :conflicts="conflictsDetails" :scheduleOptions="scheduleOptions" :showSchedulesList="showSchedulesList" @force-add="handleForceAdd" @generate-conflict-free-schedules="handleGenerateSchedules" @schedule-choosen="handleChoosenSchedule" />
    </Dialog>

</template>

<script setup>
import ScheduleComponent from './ScheduleComponent.vue';
import CoursesSectionView from './CoursesSectionView.vue';
import Dialog from 'primevue/dialog';
import { ref, watch } from 'vue'
import Schedule from '../../classes/Schedule.ts';
import ConflictDialog from './ConflictDialog.vue';
import { useCoursesStore } from '@/stores/courses'
import { generateSchedules } from '@/utils/generateSchdules';
import { filterCoursesWithNonEmptyPeriods } from '@/utils/coursesHelpers';
const props = defineProps({
    selectedCourses: {
        type: Array,
        required: true
    }
})

const currentlyAddedSections = ref([])
const currentlyAddedCourses = ref([])
const schedule = ref(new Schedule())

const isEmpty = ref(true)
const conflictsDetails = ref([])
const showConflictDialog = ref(false)
const conflictedSection = ref(null)
const conflictedCourseCode = ref(null)
const scheduleOptions = ref([])
const showSchedulesList = ref(false)
const handleAddSection = (section) => {

  if(schedule.value.canAddCourseOptionToSchedule(section)) {
    schedule.value = schedule.value.addCourseOptionToSchedule(section)
    schedule.value.addOrUpdateMeta()
    currentlyAddedSections.value.push(section.classCode)
    currentlyAddedCourses.value.push(section.code)
    isEmpty.value = false
  } else {
    conflictedSection.value = section
    conflictedCourseCode.value = section.code
    conflictsDetails.value = schedule.value.provideDetailedConflictInfo(section)
    showSchedulesList.value = false
    showConflictDialog.value = true
  }

}

const handleDeleteSection = (section) => {
  schedule.value.deleteSection(section.classCode)
  updateAddedSections(section)

}

const updateAddedSections = (deletedSection) => {
  // currentlyAddedSections.value = currentlyAddedSections.value.filter((section) => section !== deletedSection.classCode)
  // currentlyAddedCourses.value = currentlyAddedCourses.value.filter((course) => course !== deletedSection.code)
  const index = currentlyAddedSections.value.findIndex((section) => section === deletedSection.classCode)
  currentlyAddedSections.value.splice(index, 1)
  currentlyAddedCourses.value.splice(index, 1)
}

const handleForceAdd = (conflicts) => {
  conflicts.forEach((conflict) => {
    handleDeleteSection(conflict.conflictingPeriod)
  })
  handleAddSection(conflictedSection.value)
  showConflictDialog.value = false
}

const handleGenerateSchedules = () => {
  const coursesObject = {}
  const storedCourses = filterCoursesWithNonEmptyPeriods(useCoursesStore().courses)
  currentlyAddedCourses.value.forEach((courseCode) => {
    coursesObject[courseCode] = storedCourses[courseCode]
  })
  coursesObject[conflictedCourseCode.value] = storedCourses[conflictedCourseCode.value]
  console.log(coursesObject)
  scheduleOptions.value = generateSchedules(coursesObject)
  showSchedulesList.value = true
  console.log(scheduleOptions.value)
}

const handleChoosenSchedule = (newSchdule) => {
  schedule.value = newSchdule
  showConflictDialog.value = false
  currentlyAddedCourses.value = schedule.value.getUniqueCourses()
  currentlyAddedSections.value = schedule.value.getUniqueSections()
}




watch(currentlyAddedSections, () => {
  if (currentlyAddedSections.value.length == 0) {
    isEmpty.value = true
    schedule.value = new Schedule()
  } else {
    schedule.value.addOrUpdateMeta()
  }

})

watch(showConflictDialog, (newValue) => {
  if (!newValue) {
    scheduleOptions.value = []
  }
})



</script>

<style lang="scss" scoped>


</style>
