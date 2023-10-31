<template>
    <div class="flex flex-column">
        <div class="flex flex-wrap justify-content-start align-items-center gap-5">
            <div>
                <label for="daysOff" class="font-bold sm:font block mb-2">عدد ايام الاوف</label>
                <InputNumber v-model="localFilters.daysOff" @update:model-value="onDaysOffChange" dir="ltr" locale="en-US"  mode="decimal" showButtons :min="0" :max="4" inputId="daysOff"  :pt="{input:'w-3rem'}" />
            </div>

            <div v-if="!isMobile">
                <label class="font-bold block mb-2">تخصيص ايام الاوف <span class="text-gray-500 text-xs">(اختياري)</span></label>
                <SelectButton v-model="localFilters.offInTheseDays" dir="ltr" :options="daysOptions" :optionDisabled="isDayOptionDisabled" optionLabel="name" multiple optionValue="value" />
            </div>

            <div v-else>
                <label class="font-bold block mb-2">تخصيص ايام الاوف <span class="text-gray-500 text-xs">(اختياري)</span></label>
                <MultiSelect class="mult" v-model="localFilters.offInTheseDays"  :options="daysOptions" :optionDisabled="isDayOptionDisabled" optionLabel="name" multiple optionValue="value"
                :showToggleAll="false" placeholder="اختر يوم" :pt="{checkboxContainer:'mr-0 ml-2',removeTokenIcon:'ml-0 mr-2'}" />
            </div>

            <div class="">
                <label for="breaksLimit" class="font-bold block mb-2">الحد الاقصى لفترات البريك</label>
                <InputNumber v-model="localFilters.breaksLimit" dir="ltr"  suffix=" ساعة" mode="decimal" showButtons locale="en-US" :min="0" :max="20" :step="1" inputId="breaksLimit"  :pt="{input:'w-7rem rtl'}" />
            </div>

            <div class="cont">
                <Checkbox v-model="localFilters.allowLocked" inputId="allowLocked" binary class="ml-2"/>
                <label for="allowLocked">السماح بالشعب المقفله</label>
            </div>

        </div>
    </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import MultiSelect from 'primevue/multiselect';
import { isMobileFunc } from '@/utils/helpers'
import { useWindowSize } from '@vueuse/core'
import { ref, watch , computed} from 'vue'
const props = defineProps({
    filters: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['filters-changed'])


const windowSize = useWindowSize()
const isMobile = computed(() => isMobileFunc(windowSize.width.value))


const localFilters = ref({...props.filters})

const onDaysOffChange = (val)=> {
    while(val < localFilters.value.offInTheseDays.length) {
        localFilters.value.offInTheseDays.pop();
    }
}
const isDayOptionDisabled = (day) => {
    const daysOff = localFilters.value.daysOff;
    const numOfOffDays = localFilters.value.offInTheseDays.length;
    if (numOfOffDays >= daysOff && !localFilters.value.offInTheseDays.includes(day.value)) {
        return true;
    }
}
watch(localFilters, (newVal) => {
  emit('filters-changed', newVal);
}, { deep: true });

const daysOptions = ref([
    {name: "الخميس", value: "thu"},
    {name: "الاربعاء", value: "wed"},
    {name: "الثلاثاء", value: "tue"},
    {name: "الاثنين", value: "mon"},
    {name: "الاحد", value: "sun"},
])
</script>

<style lang="scss" scoped>
.mult{
    width: 39vw;
}
.cont{
    @media screen and (max-width: 430px) {
    margin-bottom: 1rem;
   }
    @media screen and (max-width: 600px) {
    margin-top: 1.2rem;
   }
   @media screen and (min-width: 601px) {
    margin-top: 1.5rem;
   }
}
</style>