<template>
    <div class="flex flex-column align-items-center">
        <h1>الشعب</h1>
        <Accordion v-if="selectedCourses.length > 0" :active-index="0" :pt="{
            root: 'w-full text-center'
        }">
        <AccordionTab v-for="course in selectedCourses" :key="course" :header="course" :pt="{
            headerAction	: 'flex justify-content-between',
        }" >
            <div v-for="section in filteredCourses[course]" :key="section.classCode">
                <div class="flex justify-content-between mb-3 align-items-center gap-4">
                    <p class="font-bold"> {{ section.classCode  }}</p>
                    <div class="flex justify-content-between  gap-3 action-buttons">
                        <Button
                        v-if="isSectionDeletable(section.classCode)"
                            label="حذف" size="small" severity="danger" icon="pi pi-trash" icon-pos="right" @click="emit('delete-section', section)" />
                        <Button
                        v-else
                         label="اضافة" size="small" severity="success" icon="pi pi-plus" icon-pos="right" @click="emit('add-section', section)"
                        :disabled="isSameCourseAdded(section.code)"/>
                        <Button label="مشاهدة" icon="pi pi-eye" icon-pos="right" size="small" @click="previwSchedule(section)" />
                    </div>
                </div>
            </div>
        </AccordionTab>
        </Accordion>
        <div v-else>
            <p class=" text-red-500 font-bold">لا يوجد مواد مختارة</p>
        </div>
    </div>
    <Dialog v-model:visible="showSchedulePreview" :draggable="false" modal :pt="{
        root: {},
    }">
    <ScheduleComponent :schedule="previewSchedule" size="small"  />
    </Dialog>
</template>

<script setup>
import { computed, onMounted, watch,ref } from 'vue';
import { useCoursesStore } from '@/stores/courses';
import Dialog from 'primevue/dialog';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Button from 'primevue/button';
import ScheduleComponent from './ScheduleComponent.vue';
import Schedule from '../../classes/Schedule.ts';
import { filterCoursesWithNonEmptyPeriods } from '@/utils/coursesHelpers';
const coursesStore = useCoursesStore();
const props = defineProps({
    selectedCourses: {
        type: Array,
        required: true
    },
    currentSchedule: {
        type: Object,
        required: true
    }, 
    currentlyAddedSections: {
        type: Array,
        required: true
    },
    currentlyAddedCourses: {
        type: Array,
        required: true
    }
})
const emit = defineEmits(['add-section','delete-section'])
const previewSchedule = ref(new Schedule())
const filteredCourses = computed(() => {
    const coursesfiltered = filterCoursesWithNonEmptyPeriods(coursesStore.courses)
    return Object.keys(coursesfiltered) 
    .filter(course => props.selectedCourses.includes(course))
    .reduce((acc, key) => {
        acc[key] = coursesfiltered[key]
        return acc
    }, {})
})

const showSchedulePreview = ref(false);

const isSameCourseAdded = (courseCode) => {
    return props.currentlyAddedCourses.some((course) => course === courseCode)
}

const isSectionDeletable = (section) => {
    return props.currentlyAddedSections.some((addedSection) => addedSection === section)
}

const previwSchedule = (section) => {
    previewSchedule.value = new Schedule()
    previewSchedule.value.addCourseOptionToSchedule(section)
    previewSchedule.value.addOrUpdateMeta();
    showSchedulePreview.value = true
}

watch(() => props.selectedCourses, (newVal) => {
    console.log('selectedCourses', newVal)
})


</script>

<style scoped lang="scss">

.action-buttons {
    font-size: 12px;
    width: fit-content;
    height: fit-content;
    :deep(.pi) {
        font-size: 12px;
        margin-inline-start: 0.5rem;
        margin-inline-end: 0;
    }

}
</style>