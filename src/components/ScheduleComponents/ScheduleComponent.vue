<template>
  <div ref="scheduleDiv" class="schedule relative" :class="props.size">
    <HourColumn v-if="!isMobile"  :hourPixels="hourPixels" :timings="timings"/>
    <div v-for="day in DAYS" :key="day" class="flex-1">
      <h2 class="text-center">{{ DAYS_MAP[day] }}</h2>
      <Day :dayData="schedule[day]" :hourPixels="hourPixels" :timings="timings" />
    </div>
    <Button
      icon="co pi pi-info-circle"
      class="absolute info-btn"
      @click="toggle"
      text
      rounded
    ></Button>
    <OverlayPanel ref="op" class="small-overlay-panel">
      <p>
        اجمالي البريكات {{ getTotalBreaks(schedule) }} دقيقة ({{
          Math.round(getTotalBreaks(schedule) / 60)
        }}
        ساعة)
      </p>
      <p>عدد ايام الاوف {{ getDaysOff(schedule).length }}</p>
    </OverlayPanel>
    <Button
    :icon="bookMarkButton ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'"
    class="absolute bookmark-btn"
    @click="saveCurrentSchedule"
    text
    rounded
  ></Button>
  </div>
  <SaveButton v-if="size=='default'" :targetRef="scheduleDiv" />
</template>

<script setup>
import HourColumn from './HourColumn.vue';
import Day from './Day.vue'
import SaveButton from './SaveButton.vue';
import { computed, onMounted, ref } from 'vue'
import {DAYS_MAP, DAYS, SIZE_PIXELS_MAP} from '@/utils/constants'
import {isMobileFunc} from '@/utils/helpers'
import {useWindowSize} from '@vueuse/core'
import { getTotalBreaks } from '../../utils/scheduleHelpers';
import { getDaysOff } from '../../utils/scheduleHelpers';
import Button  from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import { useScheduleStore } from '@/stores/saveSchedule';
const props = defineProps({
  schedule: {
    type: Object,
    required: true
  },
  size:{
    type: String,
    required: false,
    default: 'default',
    validator: (value) => {
      return ['default', 'small'].includes(value);
    }
  }
})
const scheduleDiv = ref();
const windowSize = useWindowSize()
const timings = computed(()=> (props.schedule.meta.timings));
const isMobile = computed(()=> isMobileFunc(windowSize.width.value))
const device = computed(() => isMobile.value? 'mobile' : 'other');
const hourPixels = computed(() => SIZE_PIXELS_MAP[device.value][props.size]);

const op = ref(null);

    // Method to toggle the visibility of the OverlayPanel
    const toggle = (event) => {
      op.value.toggle(event);
    };

    const bookMarkButton = ref(false);
    const scheduleStore = useScheduleStore();
// const currentSchedule = ref({}); // Replace with your schedule data source

// Function to save the current schedule
const saveCurrentSchedule = () => {
  bookMarkButton.value = !bookMarkButton.value;
  scheduleStore.saveSchedule(props.schedule);
  console.log('saved');
  console.log(scheduleStore.schedules);
  // Optionally, show a message to the user
};
onMounted(() => {
  scheduleStore.loadSchedules();
});
</script>

<style lang="scss" >
.schedule {
  border: 1px solid #aaa;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  width: 80vw;
  max-width: 1100px;
  min-width: 800px;
  // for phones
  @media screen and (max-width: 600px) {
    width: 100vw;
    max-width: 600px;
    min-width: 0px;
    padding: 2px;
    h2 {
      font-size: 0.7rem;
    }
  }
}
.schedule.small {
  width: 30vw;
  min-width: 430px;
  max-width: 600px;
  @media screen and (max-width: 600px) {
    width: 90vw;
    max-width: 600px;
    min-width: 0px;
    padding: 2px;
    h2 {
      font-size: 0.7rem;
    }
  }

  h2 {
    font-size: 1rem;
  }
}
.info-btn{
  top: -10px;
  left: -10px;
}
.bookmark-btn {
  top: -12px;
  right: -12px;
}
.bookmark-btn:active {
  background-color: #f0f0f0;
}
.small-overlay-panel {
  // width: 200px; /* Adjust the width as needed */
  height: 100px; /* Adjust the height as needed */
  padding: 0px;
}
</style>
