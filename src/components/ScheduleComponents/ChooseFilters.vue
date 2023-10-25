<template>
    <div class="flex flex-column">
        <div class="flex justify-content-start align-items-center gap-5">
            <div class="flex">
                <Checkbox v-model="localFilters.allowLocked" inputId="allowLocked" binary class="ml-2"/>
                <label for="allowLocked">السماح بالشعب المقفله</label>
            </div>

            <div>
                <label for="daysOff" class="font-bold block mb-2">عدد الايام الاجازه</label>
                <InputNumber v-model="localFilters.daysOff" @update:model-value="onDaysOffChange" dir="ltr"  mode="decimal" showButtons :min="0" :max="5" inputId="daysOff"  :pt="{input:'w-3rem'}" />
            </div>

            <div>
                <label class="font-bold block mb-2">تخصيص الايام</label>
                <SelectButton v-model="localFilters.offInTheseDays" dir="ltr" :options="daysOptions" :optionDisabled="isDayOptionDisabled" optionLabel="name" multiple optionValue="value" />
            </div>

            <div>
                <label for="breaksLimit" class="font-bold block mb-2">الحد الاقصى لفترات البريك</label>
                <InputNumber v-model="localFilters.breaksLimit" dir="ltr"  suffix=" ساعة" mode="decimal" showButtons :min="0" :max="100" :step="10" inputId="breaksLimit"  :pt="{input:'w-7rem rtl'}" />
            </div>

        </div>
    </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import { ref, watch } from 'vue'
const props = defineProps({
    filters: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['filters-changed'])

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

</style>