<template>
  <div class="mt-3 flex flex-column">
    <MultiSelect
      class="multiselect mb-2"
      :class="{ 'p-invalid': errorMessage }"
      v-model="selectedCourses"
      @change="$emit('courses-changed', selectedCourses)"
      display="chip"
      :options="courses"
      optionLabel="name"
      optionValue="code"
      placeholder="المواد المختارة"
      :maxSelectedLabels="8"
      filter
      scrollHeight="350px"
      :showToggleAll="false"
      :pt="{ checkboxContainer: 'mr-0 ml-2', removeTokenIcon: 'ml-0 mr-2' }"
    >
      <template #option="option">
        <span>
          {{ option.option.name }}
          {{ finishedCourses.includes(option.option.code) ? '(مجتازة)' : '' }}
        </span>
      </template>
    </MultiSelect>
    <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
  </div>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect'
import { usePlanStore } from '@/stores/userPlan'
import { ref, watch } from 'vue'
const props = defineProps({
  courses: {
    type: Array,
    required: true
  },
  errorMessage: {
    required: true
  },
  showFinishedCourses: {
    type: Boolean,
    required: false,
    default: false
  }
})
const finishedCourses = usePlanStore().getFinishedCoursesCodes

// defeine emits
const emit = defineEmits(['courses-changed'])
const selectedCourses = ref([])

watch(
  () => props.showFinishedCourses,
  () => {
    selectedCourses.value = []
    emit('courses-changed', selectedCourses.value)
  }
)
</script>

<style lang="scss" scoped>
.multiselect {
  width: 75vw;
}
</style>
