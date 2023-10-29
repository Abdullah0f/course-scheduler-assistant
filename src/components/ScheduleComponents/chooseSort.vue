<template>
    <div class="mt-3 flex align-items-center gap-3">
        <label for="sort">رتب حسب</label>
        <Dropdown v-model="chosenSort" :options="sorts" optionValue="value" optionLabel="name" placeholder="رتب حسب" class="w-15rem" :pt="{input: 'font'}"/>
        <div v-if="chosenSort">
            <Button
            @click="setOrder('asc')" 
            icon="pi pi-sort-amount-up" 
            iconPos="right" 
            class="p-button-text" />

            <Button
            @click="setOrder('desc')" 
            icon="pi pi-sort-amount-down" 
            iconPos="right" 
            class="p-button-text"/>
        </div>
        

    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';
import { ref } from 'vue'
import Button  from 'primevue/button';

const props = defineProps({
    sortCriterion: {
        type: String,
        required: true
    },
    sortOrder: {
        type: String,
        default: 'asc'
    }
})
const emit = defineEmits(['sort-changed'])

const chosenSort = ref(props.sortCriterion);
const order = ref(props.sortOrder);

const sorts = ref([
    {name:"طول الجدول", value: "timeDiff"},
    {name:"عدد ايام الاوف", value: "daysOff"},
    {name:"عدد البريكات", value: "breaks"},
])

function setOrder(newOrder) {
    order.value = newOrder;
    emitSortChange();
}

function emitSortChange() {
    emit('sort-changed', `${chosenSort.value}-${order.value}`);
}

</script>

<style lang="scss" scoped>

</style>