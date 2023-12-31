<template>
  <div
    class="lecture hide-scrollbar"
    :class="{'locked': lectureData.isOpen == 'مغلقة'}"
    v-tooltip.top="{
        value: courseOpen ? 'الشعبة مغلقة' : '',
        pt: {
            arrow: {
                style: {
                    borderRightColor: 'var(--primary-color)'
                }
            },
            text: 'bg-primary font-medium'
        }
    }"
      :style="{ top: lectureTop + 'px', height: lectureHeight + 'px', backgroundColor: lectureColor }">
    
    <i v-if="lectureData.isOpen == 'مغلقة'" class="pi tst pi-lock"></i>
    
    <!-- Start Time (Mobile Only) -->
    <div class=" -mb-1 " v-if="isMobile">
      <p class=" z-5 font-bold  font-italic">{{ readableTime(lectureData.startTime) }}</p>
    </div>
     <!-- End Time (Mobile Only) -->
     <div class="top-0 left-0 absolute px-1 block " v-if="isMobile">
      <p class=" z-5 font-bold  font-italic">{{ readableTime(lectureData.endTime) }}</p>
    </div>
    
    <h3 class="text-center mb-0">{{ lectureData.title }}
    <p v-if="!showFullData" class=" pi pi-info-circle mr-1 cursor-pointer info-button " @click="toggle"> </p>
    </h3>
    <OverlayPanel ref="op" class="overlay-panel" :style="{backgroundColor:lectureColor}">
      <LectureInfo :lectureData=lectureData />
    </OverlayPanel> 

    <div v-if="showFullData" >
      <LectureInfo :lectureData=lectureData />
    </div>

  </div>
</template>

<script setup>
import { computed , ref} from 'vue'
import { isMobileFunc } from '@/utils/helpers'
import { useWindowSize } from '@vueuse/core'
import { getColor } from '@/utils/getColor'
import OverlayPanel from 'primevue/overlaypanel'
import LectureInfo from './LectureInfo.vue'
const props = defineProps({
  lectureData: {
    type: Object,
    required: true
  },
  hourPixels: {
    type: Number,
    required: true
  },
  timings: {
    type: Object,
    required: true
  }
})
const op = ref()
const toggle = (event) => {
    op.value.toggle(event)
}

const lectureColor = computed(() => getColor(props.lectureData.title))
const lectureTop = computed(() => {
  const hourDiff = props.lectureData.startTime.getHours() - props.timings.earliestHour
  const totalMinutes = hourDiff * 60 + props.lectureData.startTime.getMinutes()
  return props.hourPixels * (totalMinutes / 60)
})
const windowSize = useWindowSize()

const isMobile = computed(() => isMobileFunc(windowSize.width.value))

const totalDurationInMinutes = computed(() => {
  const durationInMinutes =
    props.lectureData.endTime.getMinutes() - props.lectureData.startTime.getMinutes()
  const durationInHours =
    props.lectureData.endTime.getHours() - props.lectureData.startTime.getHours()
  return durationInHours * 60 + durationInMinutes
})

const showFullData = computed(() => totalDurationInMinutes.value >= 90)

const lectureHeight = computed(() => {
  return (totalDurationInMinutes.value / 60) * props.hourPixels
})
const readableTime = (time) => {
  return `${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')}`
}

const courseOpen = ref(props.lectureData.isOpen == 'مغلقة'? true : false)
</script>
<style  lang="scss">
.lecture {
  border: 1px solid #ddd;
  text-align: right;
  padding: 3px;
  padding-top: 0;
  position: absolute;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: scroll;
  width: -webkit-fill-available;
  width: -moz-available;
  width: fill-available;
  @media screen and (max-width: 600px) {
    h3 {
      font-size: 0.5rem;
    }
    p {
      font-size: 0.39rem;
    }
  }
}
.small .lecture {
  h3 {
    font-size: 0.6rem;
  }
  p {
    font-size: 0.5rem;
  }
  .info-button {
    font-size: 0.7rem;
  }
  @media screen and (max-width: 600px) {
    h3 {
      font-size: 0.5rem;
    }
    p , .info-button{
      font-size: 0.39rem;
    }
  }
}
.locked {
  border: 2px solid #4b0707;
  box-shadow: 3px 2px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;

  .tst{
    font-size: 9px;
    position: absolute;
    top: 3px;
    left: 2px;
    color: black;
    font-weight: 800;
    transition: all 0.3s ease-in-out;
    // right: 0;
  }
  &:hover {
    border: 2px solid #a11e1e;
    
    .tst{
      color: red;

    }
  }
  &:active {
    border: 2px solid #a11e1e;
    background-color: #f8d7da; /* add a background color to make it clear */
    .tst{
      color: red;

    }
  }
}

</style>

<style>
.p-overlaypanel .p-overlaypanel-content {
  padding: 0.25rem 0.8rem;
}
</style>
