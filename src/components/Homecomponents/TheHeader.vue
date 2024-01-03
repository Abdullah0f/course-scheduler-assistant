<template>
  <div id="homeApp">
    <GenderSelection @genderSelected="handleGenderSelected" />
    <SelectingCityCollege
      id="selectingCityCollege"
      v-if="userData.selectedGender != null"
      :gender="userData.selectedGender"
      @selectCityCollege="handleCiCoSelected"
    />
  </div>
</template>

<script setup>
import GenderSelection from './GenderSelection.vue'
import SelectingCityCollege from './SelectingCityCollege.vue'
// import { ref } from 'vue'
import { useUserStore } from '@/stores/HomePageData'

const userData = useUserStore()
// const selectedGender = userData.selectedGender;

const handleGenderSelected = (gender) => {
  userData.setSelectedGender(gender)
}

const handleCiCoSelected = (info) => {
  userData.setSelectedCity(info.city)
  userData.setSelectedCollege(info.college)
}

// userData.setGender(selectGender.value)
// userData.setCity(selectedCity.value)
// userData.setCollege(selectedCollege.value)
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
