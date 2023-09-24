<template>
  <div class="mt-8 flex flex-column md:flex-row md:justify-content-between gap-3">
    <!-- check  -->
    <div 
      class="btn1 mb-3 md:ml-5 w-17rem fadein  animation-duration-1000 flex flex-column align-items-center gap-1"
    >
      <!-- Gender selection buttons and logic -->
      <i class="pi pi-user" style="font-size: 2.5rem"></i>
      <h2>طالب</h2>
      <Button id="male" type="button" @click="selectGender('male')" outlined>أضغط هنا</Button>
    </div>
    <div
      class="btn1 w-17rem fadein animation-duration-1000 w-14rem flex flex-column align-items-center gap-1"
    >
      <!-- Gender selection buttons and logic -->
      <i class="pi pi-user" style="font-size: 2.5rem"></i>
      <h2>طالبة</h2>
      <Button id="female" type="button" @click="selectGender('female')" outlined>أضغط هنا</Button>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'

const emit  = defineEmits(['genderSelected'])

const selectGender = (gender) => {
  // Emit the selected gender to the parent component
  emit('genderSelected', gender)
}
</script>

<style lang="scss" scoped>
.btn1 {
  justify-content: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 10px;
  width: 200px;
  height: 200px;
  background-color: #fff;
  box-shadow: 0 0 10px #aaa;
}
</style>
