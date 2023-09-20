<template>
  <h1>الملف الشخصي</h1>
  <div class="flex flex-column md:flex-row md:justify-content-between gap-3">
    <Button type="button" label="Button 1" class="fadein animation-duration-1000 animation-iteration-infinite"></Button>
    <Button type="button" label="Button 2" severity="secondary"></Button>
    <Button type="button" label="Button 3" severity="help"></Button>
</div>
</template>

<script setup>
import Button from 'primevue/button';
</script>

<style>

</style>