<template>
    <div id="homeApp">
  <div class="mt-8 flex flex-column md:flex-row md:justify-content-between gap-3">
    <div
      class="w-14rem fadeinleft animation-duration-1000 btn1 flex flex-column align-items-center gap-1"
    >
      <i class="pi pi-user" style="font-size: 2.5rem"></i>
      <h2>طالب</h2>
      <Button
        id="male"
        type="button"
        @click="scrollToTarget"
        outlined=""
        >أضغط هنا</Button
        >
        <!-- @click="(selectedGenderMale = !selectedGenderMale) && scrollToElement" -->
    </div>
    <div
      class="fadeinright animation-duration-1000 w-14rem btn1 flex flex-column align-items-center gap-1"
    >
      <i class="pi pi-user" style="font-size: 2.5rem"></i>
      <h2>طالبة</h2>
      <Button id="female" type="button" outlined="">أضغط هنا</Button>
    </div>
  </div>
  <div
    ref="scrollTo"
    v-if="selectedGenderMale"
    class="stdForm flex flex-column gap-5 mb-5 justify-content-center fadein animation-duration-1000"
  >
    <div class="flex justify-content-center">
      <Dropdown
        v-model="selectedcity"
        :options="cities"
        optionLabel="name"
        placeholder="ادخل المقر"
        class="ml-2 w-full justify-content-center md:w-14rem"
      />
    </div>
    <!-- <h3 class="m-auto">اختر كليتك</h3>
    <Divider class="m-0"  /> -->
    <div class="flex flex-column gap-2 scalein animation-duration-1000" v-if="selectedcity">
      <Button v-for="(college, i) in colleges" :key="i" link :label="college.name"></Button>
    </div>
  </div>
</div>
</template>

<script setup>
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
// import Divider from 'primevue/divider'
import { ref, nextTick } from 'vue'

// const selectedGenderFemale = ref(false);

// const cities = ref([
//     { name: 'New York', code: 'NY' },
//     { name: 'Rome', code: 'RM' },
//     { name: 'London', code: 'LDN' },
//     { name: 'Istanbul', code: 'IST' },
//     { name: 'Paris', code: 'PRS' }
// ]);

const cities = ref([
  { name: 'الخرج' },
  { name: 'وادي الدواسر' },
  { name: 'الدراسات العليا' },
  { name: 'حوطة بن تميم' }
])
const selectedcity = ref()

const colleges = ref([
    { name: 'كلية الهندسة' },
    { name: 'كلية الصيدلة' },
    { name: 'كلية الطب' },
    { name: 'كلية هندسة وعلوم الحاسب' },
    { name: 'كلية الأدب والفنون التطبيقية بالدلم' },
    { name: ' كلية العلوم والدراسات الإنسانية' },
    { name: 'كلية إدارة الأعمال' },
  { name: 'كليةالتربية' },
  { name: 'كلية العلوم الطبية التطبيقية' },
  { name: 'كلية طب الأسنان' }
])

const selectedGenderMale = ref(false)
const scrollTo = ref(null)

const scrollToTarget = () => {
      selectedGenderMale.value = !selectedGenderMale.value;
      if (selectedGenderMale.value) {
        scrollTo.value.scrollIntoView({ behavior: 'smooth' });
      }
    };
</script>

<style>
#homeApp {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
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
.stdForm {
  margin-top: 50px;
  border: 1px solid #aaa;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  box-shadow: 0 0 8px #aaa;
}
</style>
