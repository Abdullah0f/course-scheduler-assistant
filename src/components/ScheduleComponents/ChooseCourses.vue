<template>
    <div class="mt-7 flex flex-column" >
        <MultiSelect class="multiselect mb-2" :class="{ 'p-invalid': errorMessage }" v-model="selectedCourses"  @change="$emit('courses-changed', selectedCourses)"  display="chip" :options="courses" optionLabel="name" optionValue="code"  placeholder="المواد المختارة"
    :maxSelectedLabels="8" filter  scrollHeight="350px" :showToggleAll="false" :pt="{checkboxContainer:'mr-0 ml-2',removeTokenIcon:'ml-0 mr-2'}" />
    <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>

    </div>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect';
import {  ref } from 'vue'
 defineProps({
    courses: {
        type: Array,
        required: true
    },
    errorMessage: {
        required: true
    }
})

// defeine emits
defineEmits(['courses-changed'])
const selectedCourses = ref([])
</script>

<style lang="scss" scoped>
.multiselect{
    width: 75vw;
}
</style>