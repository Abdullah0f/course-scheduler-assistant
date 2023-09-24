<template>
    <div class="my-5" >
        <MultiSelect class="w-full mb-2" v-model="selectedCourses" display="chip" :options="(courses)" optionLabel="name" placeholder="Select Cities"
    :maxSelectedLabels="5" />

    <!-- submit button -->
    <Button label="تاكيد" @click="$emit('submit-courses', selectedCourses)"></Button>
    </div>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import {  ref, watch } from 'vue'
const props = defineProps({
    courses: {
        type: Object,
        required: true
    }
})
const selectedCourses = ref([])
watch(selectedCourses, (newValue, oldValue) => {
    console.log(newValue)
})
</script>

<style lang="scss" scoped>

</style>