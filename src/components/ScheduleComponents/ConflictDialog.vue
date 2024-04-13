<template>
        <div>
            <p>
                هذه الشعبة تتعارض مع المحاضرات التالية في الجدول:
            </p>
            <ul>
                <li v-for="conflict in conflicts" :key="conflict" class=" line-height-4">
                     {{  conflict.conflictingPeriod.title }} , {{ DaysArabic[conflict.day]  }} : {{ conflict.conflictingPeriod.startTime.toLocaleTimeString([],options) }} - {{ conflict.conflictingPeriod.endTime.toLocaleTimeString([],options) }}
                </li>
            </ul>
            <p class="text-center ">
                كيف ترغب في التعامل مع هذا التعارض؟
            </p>
            <div class="flex justify-content-between gap-5">
                <Button class="min-w-max" @click="emit('force-add', props.conflicts)" severity="danger" >إضافة وحذف التعارضات</Button>
                <Button class="min-w-max" @click="emit('generate-conflict-free-schedules')" severity="info"> تجربة شعب مختلفة </Button>
            </div>
            <div v-if="showSchedulesList">
                <div v-if="scheduleOptions.length > 0">
                <SchedulesList :schedules="scheduleOptions">
                <template #extra="{ schedule }">
                    <Button class="" @click="emit('schedule-choosen',schedule)" severity="info"> اختيار</Button>
                </template>
                </SchedulesList>
                </div>
                <div v-else>
                    <p class="text-center">لا يوجد شعب بديلة لهذا التعارض</p>
                </div>
            </div>
        </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { DaysArabic } from '@/utils/enums';
import Button from 'primevue/button';
import { useCoursesStore } from '@/stores/courses'
import SchedulesList from './SchedulesList.vue'
const props = defineProps({
    conflicts: {
        type: Array,
        required: true
    },
    scheduleOptions: {
        type: Array,    
    },
    showSchedulesList: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['force-add','generate-conflict-free-schedules','schedule-choosen'])
const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false

}

</script>

<style scoped>

</style>