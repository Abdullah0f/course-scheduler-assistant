<template>
    <div class="flex flex-column">
        <div class="flex">
            <Checkbox v-model="localFilters.allowLocked" inputId="allowLocked" binary class="ml-2"/>
            <label for="allowLocked">السماح بالشعب المقفله</label>
        </div>
    </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import { ref, watch } from 'vue'
const props = defineProps({
    filters: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['filters-changed'])

const localFilters = ref({...props.filters})

watch(localFilters, (newVal) => {
  emit('filters-changed', newVal);
}, { deep: true });
</script>

<style lang="scss" scoped>

</style>