<template>
    <div class="mt-3 flex align-items-center gap-3">
        <label for="sort">رتب حسب</label>
        <Dropdown v-model="chosenSort" :options="sortingOptions" optionValue="value" optionLabel="name" placeholder="رتب حسب" class="w-15rem" :pt="{input: 'font'}"/>
        <div v-if="chosenSort">
            <Button
            @click="setOrder('asc')" 
            icon="pi pi-sort-amount-up" 
            class="p-button-text" />

            <Button
            @click="setOrder('desc')" 
            icon="pi pi-sort-amount-down" 
            class="p-button-text"/>
        </div>
        

    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';
import { ref , watch} from 'vue'
import Button  from 'primevue/button';

const props = defineProps({
    sort: {
        type: String,
        required: true
    },
    sortOrder: {
        type: String,
        default: 'asc'
    }
})
const emit = defineEmits(['sort-changed'])

const chosenSort = ref(props.sort);
const order = ref(props.sortOrder);

const sortingOptions = ref([
    {name:"طول الجدول", value: "timeDiff"},
    {name:"عدد ايام الاوف", value: "daysOff"},
    {name:"عدد البريكات", value: "breaks"},
])

function setOrder(newOrder) {
    order.value = newOrder;
    
}

watch([chosenSort, order], () => {
    emit('sort-changed', `${chosenSort.value}-${order.value}`);
});

</script>

<style lang="scss" scoped>

</style>