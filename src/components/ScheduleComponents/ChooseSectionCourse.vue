<template>
  <div class="mb- mlt">
    <MultiSelect
      class="mb-2 w-10"
      v-model="selectedSection"
      display="chip"
      :options="transformedSelectCourses"
      optionLabel="name"
      optionValue="code"
      placeholder="الشعب المختارة"
      :disabled="!transformedSelectCourses.length"
      @change="$emit('update-selectedSection', selectedSection)"
      :showToggleAll="false"
      :pt="{ checkboxContainer: 'mr-0 ml-2', removeTokenIcon: 'ml-0 mr-2' }"
      filter
    />
  </div>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect'
import { ref, computed, reactive, watch } from 'vue'

// Props passed from parent component
const props = defineProps({
  selectCourse: Object
})

// Create a local copy of selectCourse
const localSelectCourse = reactive({ ...props.selectCourse })

watch(
  () => props.selectCourse,
  (newSelectCourse, oldSelectCourse) => {
    // Copy newSelectCourse to localSelectCourse
    Object.assign(localSelectCourse, newSelectCourse)

    // Get the keys of localSelectCourse and newSelectCourse
    const localKeys = Object.keys(localSelectCourse)
    const newKeys = Object.keys(newSelectCourse)

    // Find the keys that are in localSelectCourse but not in newSelectCourse
    const keysToRemove = localKeys.filter((key) => !newKeys.includes(key))

    // Remove the courses with the keysToRemove from localSelectCourse
    keysToRemove.forEach((key) => delete localSelectCourse[key])

    // If a course was unselected, clear selectedSection
    if (Object.keys(oldSelectCourse).length > Object.keys(newSelectCourse).length) {
      selectedSection.value = []
    }
  }
)

// difine emits
defineEmits(['update-selectedSection'])

// Local state for selected section
const selectedSection = ref([])

// Computed property to transform courses for selection
const transformedSelectCourses = computed(() => {
  return Object.keys(localSelectCourse).flatMap((key) => {
    return localSelectCourse[key].map((course, i) => {
      return {
        name: course.code + ' -' + course.classCode + '',
        code: i+" - "+course.classCode+" - "+course.code,
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.mlt {
   width: 60vw;

}
</style>
