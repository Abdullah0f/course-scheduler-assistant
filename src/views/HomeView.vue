<template>
  <div class="p-d-flex p-jc-center p-ai-center p-dir-col w-max">
    <!-- <div class="m-6">
      <h2>Your Heading Here</h2>
      <p>Your message here</p>
      <Button label="Go to Gender" class="p-m-2" />
    </div> -->
    <TheHeader id="gender" />
  </div>
</template>

<script setup>
// import  Button  from 'primevue/button';
import TheHeader from '@/components/Homecomponents/TheHeader.vue';
</script>

<style scoped>
.p-d-flex {
  height: 100vh;
  margin: 0 auto;
}
</style>