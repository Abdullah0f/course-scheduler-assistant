<template>
  <div class="mb-4 mlt">
    <span class="p-float-label">
      <MultiSelect
        id="multiselect"
        v-model="selectedSection"
        :options="transformedSelectCourses"
        :optionDisabled="(option) => isOtherSectionFromCourseSelected(option)"
        optionLabel="label"
        optionGroupLabel="label"
        :optionGroupChildren="getChildrenVisibility"
        :disabled="!transformedSelectCourses.length"
        scrollHeight="300px"
        display="chip"
        @change="$emit('update-selectedSection', selectedSection)"
        :showToggleAll="false"
        class=" p-2  w-full md:w-20rem"
        filter
        :pt="{checkboxContainer:'mr-0 ml-2',removeTokenIcon:'ml-0 mr-2'}"
      >
        <template #optiongroup="slotProps">
          <div class="flex align-items-center justify-content-between">
            <div>{{ slotProps.option.label }}</div>
            <Button
              text
              rounded
              :icon="
                childrenVisibility[slotProps.option.label] ? 'pi pi-angle-down' : 'pi pi-angle-up'
              "
              @click="toggleVisibility(slotProps.option.label)"
              size="small"
            />
          </div>
        </template>
        <template #value="slotProps">
          <div>
            <div class="" v-if="slotProps.value.length > 0">
              {{ formatLabel(slotProps.value) }}
            </div>
          </div>
        </template>
      </MultiSelect>
      <label for="multiselect" class="text-500"> اختر الشعب (اختياري) </label>
    </span>
  </div>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import { ref, computed, reactive, watch } from 'vue'

// Props passed from parent component
const props = defineProps({
  selectCourse: Object
})
// Create a local copy of selectCourse
const localSelectCourse = reactive({ ...props.selectCourse })

// Watch for changes in selectCourse
    watch(
      () => props.selectCourse,
      (newSelectCourse) => {
        // Copy newSelectCourse to localSelectCourse
        Object.assign(localSelectCourse, newSelectCourse)
        // Get the keys of localSelectCourse and newSelectCourse
        const localKeys = Object.keys(localSelectCourse)
        const newKeys = Object.keys(newSelectCourse)

        // Find the keys that are in localSelectCourse but not in newSelectCourse
        const keysToRemove = localKeys.filter((key) => !newKeys.includes(key))

        // Remove the courses with the keysToRemove from localSelectCourse
        keysToRemove.forEach((key) => delete localSelectCourse[key])

        // If a course was unselected, remove it from selectedSection
        selectedSection.value = selectedSection.value.filter((selected) => {
          // Ensure selected has a code property
          if (selected && selected.code) {
            const selectedParts = selected.code.split(' - ')
            return selectedParts.length === 3 && newKeys.includes(selectedParts[2].trim())
          }
          return false
        })
      }
    )

// // difine emits
// defineEmits(['update-selectedSection'])

// Local state for selected section
const selectedSection = ref([])

const isOtherSectionFromCourseSelected = (currentSection) => {
  // Check if currentSection and its code property exist
  if (currentSection && currentSection.code) {
    const parts = currentSection.code.split(' - ')
    if (parts.length === 3) {
      const courseCode = parts[2].trim()
      return selectedSection.value.some((selected) => {
        // Ensure selected has a code property
        if (selected && selected.code) {
          const selectedParts = selected.code.split(' - ')
          return (
            selectedParts.length === 3 &&
            selectedParts[2].trim() === courseCode &&
            selected.code !== currentSection.code
          )
        }
        return false
      })
    }
  }
  return false
}
// Visibility state for each group
const childrenVisibility = reactive({})

// Computed property to transform courses for selection
const transformedSelectCourses = computed(() => {
  const groups = {}
  Object.keys(localSelectCourse).forEach((key) => {
    const groupLabel = 'شعب: ' + key // or any other way to define your group label
    groups[groupLabel] = localSelectCourse[key].map((course, i) => ({
      label: course.code + ' - ' + course.classCode,
      code: i + ' - ' + course.classCode + ' - ' + course.code
    }))
    childrenVisibility[groupLabel] = true
  })
  return Object.keys(groups).map((groupLabel) => ({
    label: groupLabel,
    items: groups[groupLabel]
  }))
})
// Methods to toggle visibility and get children visibility
const toggleVisibility = (label) => {
  if (childrenVisibility[label] === undefined) {
    childrenVisibility[label] = true // Initialize if not already set
  } else {
    childrenVisibility[label] = !childrenVisibility[label]
  }
}
const getChildrenVisibility = (option) => {
  // This method now only checks visibility, does not modify the data structure
  return childrenVisibility[option.label] ? option.items : []
}
const formatLabel = (items) => {
  return items
    .map((item) => {
      // Split the code into parts
      const parts = item.code.split(' - ')
      // Check if there are three parts
      if (parts.length === 3) {
        // Return the formatted string (second and third parts)
        return `${parts[2]} - ${parts[1]}`
      }
    })
    .join(' , ')
}
</script>

<style lang="scss" scoped>
.mlt {
  // min-width: 300px;
  max-width: 60vw;
}
</style>
