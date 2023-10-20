<template>
    <div class="flex flex-column">
        <div class="flex">
            <Checkbox v-model="checked" inputId="isLocked" value="H" class="ml-2"/>
            <label for="isLocked">السماح بالشعب المقفله</label>
        </div>
    </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue'
const checked = ref(false)
</script>

<style lang="scss" scoped>

</style>