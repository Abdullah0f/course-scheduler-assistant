<template>
  <div class="mr-5">
    <div v-if="Object.keys(courses).length !== 0">
      <form @submit.prevent="handleCourses">
        <ChooseCourses
          :courses="transformedCourses"
          @courses-changed="onSelectedCoursesChange"
          :errorMessage="selectedCoursesError"
        />
        <ChooseSectionCourse
          :selectCourse="selectCourse"
          @update-selectedSection="handleSelectedSectionUpdate"
        />
        <ChooseFilters @filters-changed="updateFilters" :filters="filters" />
        <Button class="w-max mt-3" label="تاكيد" type="submit"></Button>
      </form>
    </div>
    <div v-else class="text-lg">
      <p>لا يوجد مواد مضافة حالياً</p>
      <p>بامكانك اضافة المواد الخاصة بك من صفحة رفع ملف او من هنا</p>
      <UploadData :center="false" />

      <p>او اذا اردت تجربة الموقع بدون رفع بيانات حقيقية</p>
      <LoadExampleCourses />
    </div>
  </div>
  <div v-if="schedules">
    <ChooseSort :sort="sort" @sort-changed="updateSort" class="mr-5" />
    <SchedulesList :schedules="sortedSchedules" />
  </div>
  <ScrollTop
    target="window"
    :threshold="1500"
    icon="pi pi-arrow-up"
    :pt="{
      root: 'w-2rem h-2rem border-round-sm bg-primary hover:bg-primary',
      icon: {
        class: 'text-base'
      }
    }"
  />
</template>

<script setup>
import { schedule } from '../../schedule.js'
import ScheduleComponent from '@/components/ScheduleComponents/ScheduleComponent.vue'
import { generateSchedules } from '@/utils/generateSchdules.js'
import { resetColors } from '@/utils/getColor.js'
import ChooseCourses from '@/components/ScheduleComponents/chooseCourses.vue'
import ChooseSectionCourse from '@/components/ScheduleComponents/ChooseSectionCourse.vue'
import ChooseFilters from '@/components/ScheduleComponents/ChooseFilters.vue'
import SchedulesList from '@/components/ScheduleComponents/SchedulesList.vue'
import LoadExampleCourses from '@/components/misc/LoadExampleCourses.vue'
import { useCoursesStore } from '@/stores/courses'
import Button from 'primevue/button'
import { ref, computed } from 'vue'
import ChooseSort from '@/components/ScheduleComponents/chooseSort.vue'
import { sortSchedules } from '@/utils/scheduleHelpers.js'
import { useField, useForm } from 'vee-validate'
import ScrollTop from 'primevue/scrolltop'
import UploadData from './UploadData.vue'

const { handleSubmit } = useForm()

const hasSomthingChanged = ref(true)
const somethingChanged = () => (hasSomthingChanged.value = true)

const schedules = ref(null)
const courses = computed(() => useCoursesStore().courses)
const transformedCourses = computed(() => {
  return Object.keys(courses.value).map((key) => ({
    name: courses.value[key][0].code + ' | ' + courses.value[key][0].name,
    code: key
  }))
})
const selectCourse = ref([])
const selectedSection = ref([])

// Method to handle the update-selectedSection event
const handleSelectedSectionUpdate = (newSelection) => {
  selectedSection.value = newSelection
  somethingChanged()
}

function isNotEmpty(value) {
  return (Array.isArray(value) && value.length > 0) || 'لا يمكن ان تكون المواد المختارة فارغة'
}
const {
  errorMessage: selectedCoursesError,
  value: selectedCourses,
  handleChange: onSelectedCoursesChangeValidator
} = useField('selectedCourses', isNotEmpty)
const onSelectedCoursesChange = (selectedCourses) => {
  onSelectedCoursesChangeValidator(selectedCourses)
  courseSection(selectedCourses)
  somethingChanged()
}

const courseSection = (selectedCourses) => {
  selectCourse.value = selectedCourses
  const selectedCoursesObject = selectCourse.value.reduce((acc, courseCode) => {
    acc[courseCode] = courses.value[courseCode]
    return acc
  }, {})

  selectCourse.value = selectedCoursesObject

  return selectedCoursesObject
}

const sort = ref('timeDiff')
const sortedSchedules = computed(() => sortSchedules(schedules.value, sort.value))
const filters = ref({
  allowLocked: true,
  daysOff: 0,
  offInTheseDays: [],
  breaksLimit: 20
})
const updateFilters = (newFilters) => {
  filters.value = newFilters
  somethingChanged()
}

const updateSort = (newSort) => (sort.value = newSort)
const handleCourses = handleSubmit((values) => {
  if (!hasSomthingChanged.value) return
  const { selectedCourses } = values
  if (!selectedCourses.length) return
  resetColors()
  let selectedCoursesObject = selectedCourses.reduce((acc, courseCode) => {
    acc[courseCode] = courses.value[courseCode]
    return acc
  }, {})

  schedules.value = generateSchedules(selectedCoursesObject, selectedSection.value, filters.value)
  hasSomthingChanged.value = false
})
</script>

<style scoped></style>
