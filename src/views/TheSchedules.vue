<template>
  <div class="mr-5">
    <div v-if="Object.keys(courses).length !== 0">
      <TabView
      v-model:activeIndex="activeIndex"
       :pt="
      {
        nav: 'flex justify-content-center',
      }">
        <TabPanel header="جميع الجداول الممكنة">
          <p>
          اذا اردت تحديث البيانات او رفع ملف جديد اذهب لصفحة
          <RouterLink class="link" to="/uploadData">رفع ملف</RouterLink>
          </p>
          <div class="flex gap-2 mt-7">
            <Checkbox v-model="showFinishedCourses" binary inputId="show-finished-courses" />
            <label for="show-finished-courses" class="select-none ml-2">اظهار المواد المجتازة</label>
          </div>
          <form @submit.prevent="handleCourses">
            <ChooseCourses
              :courses="transformedCourses"
              @courses-changed="onSelectedCoursesChange"
              :errorMessage="selectedCoursesError"
              :showFinishedCourses="showFinishedCourses"
            />
            <ChooseSectionCourse
              :selectCourse="selectCourse"
              @update-selectedSection="handleSelectedSectionUpdate"
            />
            <ChooseFilters @filters-changed="updateFilters" :filters="filters" />
            <Button class="w-max mt-3" label="تاكيد" type="submit"></Button>
          </form>
        </TabPanel>
        <TabPanel header="انشاء جدولك الخاص">
          <Checkbox v-model="showFinishedCourses" binary inputId="show-finished-courses" />
          <label for="show-finished-courses" class="select-none ml-2">اظهار المواد المجتازة</label>
          <ChooseCourses
              :courses="transformedCourses"
              @courses-changed="onSelectedCoursesChange"
              :errorMessage="selectedCoursesError"
              :showFinishedCourses="showFinishedCourses"
            />
          <CustomSchedule :selectedCourses="currentSelected"/>
        </TabPanel>
          
      </TabView>
    </div>
    <div v-else class="text-lg">
      <p>لا يوجد مواد مضافة حالياً</p>
      <p>بامكانك اضافة المواد الخاصة بك من صفحة رفع ملف او من هنا</p>
      <UploadData :center="false" />
    </div>
  </div>
  <div v-if="schedules && activeIndex === 0">
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
  <Dialog
    v-model:visible="isModalVisible"
    modal
    header="رسالة"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="flex-grow-1 flex justify-content-center">
      <h3>
        نرجو منكم تعبئة الاستبيان
        <a
          href="https://docs.google.com/forms/d/1bS8rbYvnHFRq6rGYNRFM8qDVXRexek5oYqg0-smhi5M"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
          @click="onModalClick"
          >من هنا</a
        >
      </h3>
    </div>
  </Dialog>
</template>

<script setup>
import { generateSchedules } from '@/utils/generateSchdules.js'
import { resetColors } from '@/utils/getColor.js'
import ChooseCourses from '@/components/ScheduleComponents/chooseCourses.vue'
import ChooseSectionCourse from '@/components/ScheduleComponents/ChooseSectionCourse.vue'
import ChooseFilters from '@/components/ScheduleComponents/ChooseFilters.vue'
import SchedulesList from '@/components/ScheduleComponents/SchedulesList.vue'
import { useCoursesStore } from '@/stores/courses'
import Button from 'primevue/button'
import { ref, computed, watch } from 'vue'
import ChooseSort from '@/components/ScheduleComponents/chooseSort.vue'
import { sortSchedules } from '@/utils/scheduleHelpers.js'
import { useField, useForm } from 'vee-validate'
import ScrollTop from 'primevue/scrolltop'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import UploadData from './UploadData.vue'
import Dialog from 'primevue/dialog'
import { useReviewFormStore } from '@/stores/reviewForm'
import Checkbox from 'primevue/checkbox'
import { usePlanStore } from '@/stores/userPlan'
import CustomSchedule from '@/components/ScheduleComponents/CustomSchedule.vue'
const { handleSubmit } = useForm()
const reviewFormStore = useReviewFormStore()
const hasSomthingChanged = ref(true)
const somethingChanged = () => (hasSomthingChanged.value = true)

const activeIndex = ref(0) // activeIndex of the tabView

const schedules = ref(null)
const showFinishedCourses = ref(false)
const courses = computed(() => useCoursesStore().courses)
const finishedCourses = usePlanStore().getFinishedCoursesCodes

const transformedCourses = computed(() => {
  const filteredCourses = Object.keys(courses.value).reduce((acc, key) => {
    if (showFinishedCourses.value) {
      acc[key] = courses.value[key]
    } else {
      if (!finishedCourses.includes(key)) {
        acc[key] = courses.value[key]
      }
    }
    return acc
  }, {})
  return Object.keys(filteredCourses).map((key) => ({
    name: courses.value[key][0].code + ' | ' + courses.value[key][0].name,
    code: key
  }))
})
const selectCourse = ref([])
const selectedSection = ref([])
const currentSelected = ref([])
const isModalVisible = ref(false)
const submitCount = ref(0)

const showModalAfterDelay = () => {
  if (reviewFormStore.userHasReviewed) return
  setTimeout(() => {
    isModalVisible.value = true
  }, 5000)
}

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
  currentSelected.value = selectedCourses
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
  submitCount.value++
})

const onModalClick = () => {
  reviewFormStore.userReviewd()
  isModalVisible.value = false
}

watch(submitCount, () => {
  if (submitCount.value % 3 === 0) showModalAfterDelay()
})
</script>

<style scoped>
.link {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}
</style>
