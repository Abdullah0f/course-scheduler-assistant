<template>
    <div id="homeApp">
      <GenderSelection @genderSelected="handleGenderSelected" />
      <SelectingCityCollege v-if="selectedGenderMale" :city="selectedCity" @collegeSelected="handleCitySelected" />
</div>
</template>

<script setup>
import GenderSelection from './GenderSelection.vue';
import SelectingCityCollege from './SelectingCityCollege.vue';
import { ref } from 'vue'

let selectedGenderMale = ref(false);
let selectedGenderFemale = ref(false);
const handleGenderSelected = (gender) => {
  console.log(gender);
  if (gender === 'male'){
   return selectedGenderMale.value = true;
  }
  return gender === 'female' ? selectedGenderFemale.value = true : selectedGenderFemale.value = false;
};
const selectedCity = ref(null);
const handleCitySelected = (city) => {
  console.log(city);
  selectedCity.value = city;
};
// const scrollTo = ref(null)

// const scrollToTarget = () => {
//       selectedGenderMale.value = !selectedGenderMale.value;
//       if (selectedGenderMale.value) {
//         scrollTo.value.scrollIntoView({ behavior: 'smooth' });
//       }
//     };
</script>

<style>
#homeApp {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
</style>
