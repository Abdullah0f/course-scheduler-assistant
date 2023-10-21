<template>
    <div class="my-5 flex flex-column" >
        <MultiSelect class="multiselect mb-2" v-model="selectedCourses"  @change="$emit('courses-changed', selectedCourses)"  display="chip" :options="courses" optionLabel="name" optionValue="code"  placeholder="Select Courses"
    :maxSelectedLabels="8" filter  scrollHeight="350px" :showToggleAll="false" :pt="{checkboxContainer:'mr-0 ml-2',removeTokenIcon:'ml-0 mr-2'}" />

    </div>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect';
import {  ref } from 'vue'
 defineProps({
    courses: {
        type: Array,
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