<template>
    <Button @click="captureAndModify">
        <i class="pi pi-download ml-2"></i>
        <span class="p-button-text">حفظ</span>
    </Button>
  </template>

  <script setup>
  import html2canvas from 'html2canvas';
  import Button from 'primevue/button';
  import { nextTick } from 'vue';
  const props = defineProps({
    targetRef: Object
  });
  const emit = defineEmits(['captureChange'])

  
  const captureAndModify = async () => {
    try {
      emit('captureChange', true)
      await nextTick()
      const canvas = await html2canvas(props.targetRef)
      const link = document.createElement('a')
      link.download = 'schedule.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
      emit('captureChange', false)
    } catch (error) {
      console.error("Error generating image:", error)
    }
  };
  </script>