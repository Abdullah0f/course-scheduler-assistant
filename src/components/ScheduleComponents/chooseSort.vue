<template>
    <div class="mt-3 flex align-items-center gap-3">
        <label for="sort">رتب حسب</label>
        <Dropdown v-model="choosenSort" :options="sorts" optionValue="value" optionLabel="name" placeholder="رتب حسب" class="w-15rem" :pt="{input: 'font'}"/>
    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';
import { ref, watch } from 'vue'

const props = defineProps({
    sort: {
        type: String,
        required: true
    }
})
const emit = defineEmits(['sort-changed'])

const choosenSort = ref(props.sort);
const sorts = ref([
    {name:"طول الجدول تصاعدي", value: "timeDiff-asc"},
    {name:"طول الجدول تنازلي", value: "timeDiff-desc"},
    {name:"عدد ايام الاوف", value: "daysOff-desc"},
    {name:"عدد البريكات تصاعدي", value: "breaks-asc"},
    {name:"عدد البريكات تنازلي", value: "breaks-desc"},    
])

watch(choosenSort, (newVal) => {
  emit('sort-changed', newVal);
});
</script>

<style lang="scss" scoped>

</style>