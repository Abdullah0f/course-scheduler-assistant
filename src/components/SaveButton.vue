<template>
    <Button @click="captureAndModify">
        <i class="pi pi-download ml-2"></i>
        <span class="p-button-text">حفظ</span>
    </Button>
  </template>
  
  <script setup>
  import html2canvas from 'html2canvas';
  import Button from 'primevue/button';
  
  const props = defineProps({
    targetRef: Object
  });
  
//   const modifyScheduleForImage = (element) => {
//     const clonedElement = element.cloneNode(true);
//     // Modify the cloned element as per your requirements
//     // ...
//     return clonedElement;
//   };
  
  const captureAndModify = async () => {
    try {
    //   const modifiedSchedule = modifyScheduleForImage(props.targetRef.value);
    //   modifiedSchedule.style.position = 'absolute';
    //   modifiedSchedule.style.left = '-9999px';
    //   document.body.appendChild(modifiedSchedule);
  
      const canvas = await html2canvas(props.targetRef);
    //   document.body.removeChild(modifiedSchedule);
  
      const link = document.createElement('a');
      link.download = 'schedule.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };
  </script>
  