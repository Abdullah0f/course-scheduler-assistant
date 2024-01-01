<template>
  <div ref="scheduleDiv" class="schedule relative" :class="props.size">
    <HourColumn v-if="!isMobile"  :hourPixels="hourPixels" :timings="timings"/>
    <div v-for="day in DAYS" :key="day" class="flex-1">
      <h2 class="text-center">{{ DAYS_MAP[day] }}</h2>
      <Day :dayData="schedule[day]" :hourPixels="hourPixels" :timings="timings" :size="size"/>
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
  <Toast />

</template>

<script setup>
import HourColumn from './HourColumn.vue';
import Day from './Day.vue'
import SaveButton from './SaveButton.vue';
import { computed, ref } from 'vue'
import {DAYS_MAP, DAYS, SIZE_PIXELS_MAP} from '@/utils/constants'
import {isMobileFunc} from '@/utils/helpers'
import {useWindowSize} from '@vueuse/core'
import { getTotalBreaks } from '../../utils/scheduleHelpers';
import { getDaysOff } from '../../utils/scheduleHelpers';
import Button  from 'primevue/button';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import OverlayPanel from 'primevue/overlaypanel';
import { useScheduleStore } from '@/stores/saveSchedule';
import getUser from '../../utils/auth/getUser';
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
const toast = useToast();
const emit = defineEmits(['unBooked']);
const scheduleDiv = ref();
const windowSize = useWindowSize()
const timings = computed(()=> (props.schedule.meta.timings));
const isMobile = computed(()=> isMobileFunc(windowSize.width.value))
const device = computed(() => isMobile.value? 'mobile' : 'other');
const hourPixels = computed(() => SIZE_PIXELS_MAP[device.value][props.size]);
const { user } = getUser()
const op = ref(null);

    // Method to toggle the visibility of the OverlayPanel
    const toggle = (event) => {
      op.value.toggle(event);
    };

    const scheduleStore = useScheduleStore();
    const bookMarkButton = computed(() => scheduleStore.isBooked(props.schedule))

const saveCurrentSchedule = async () => {
  if (user.value)
  {
  if (bookMarkButton.value) {
    await scheduleStore.unbookSchedule(props.schedule)
    emit('unBooked')
  } else {  
    if (scheduleStore.schedules.length === 10) {
    toast.removeAllGroups()
    toast.add({
      severity: "warn",
      summary: "لا يمكنك حفظ أكثر من 10 جداول",
      life: 3000,
    }) } else 
    await scheduleStore.bookSchedule(props.schedule)
  }
  } else {
    toast.removeAllGroups()
    toast.add({
      severity: "info",
      summary: "خاصية الحفظ متاحة للمستخدمين المسجلين فقط",
      life: 3000,
    })
  }
}

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
  min-width: 740px;
  // for phones
  @media screen and (max-width: 600px) {
    width: 100vw;
    max-width: 430px;
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
