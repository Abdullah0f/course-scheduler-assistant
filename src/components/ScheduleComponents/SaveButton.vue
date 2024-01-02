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
    // Emit capture change event
    emit('captureChange', true)
    await nextTick()
    // Clone the target element to avoid mutating the prop directly
    const cloneTarget = props.targetRef.cloneNode(true)
    // Apply styles to the cloned element
    cloneTarget.style.width = '100vw'
    document.body.appendChild(cloneTarget);
    // Capture the cloned element as a canvas
    const canvas = await html2canvas(cloneTarget)

    // Remove the cloned element from the body
    document.body.removeChild(cloneTarget)

    // Create link and trigger download
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