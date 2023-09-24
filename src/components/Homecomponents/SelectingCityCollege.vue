<template>
  <div
    class="stdForm flex flex-column gap-5 mb-5 justify-content-center fadein animation-duration-1000"
  >
    <div class="flex justify-content-center">
      <Dropdown
        v-model="selectedCity"
        :options="cities"
        placeholder="ادخل المقر"
        class="ml-2 w-full justify-content-center md:w-14rem"
      />
    </div>
    <div class="flex flex-column gap-2 scalein animation-duration-1000" v-if="selectedCity != null">
      <!-- :class="{ 'selected': selectedCollege === college }" -->
      <Button
        @change="selectedGender"
        link
        v-for="(college, i) in filteredColleges"
        :key="i"
        :label="college.name"
        @click="selectCityCollege(college)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, toRef, watch } from 'vue'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
const props = defineProps({
  gender: {
    type: String,
    required: true,
    validate: function () {
      if (this.gender == 'male' || this.gender == 'female') return true
      else return false
    }
  }
})
const cities = ['الخرج', 'وادي الدواسر', 'حوطة بن تميم', 'الأفلاج', 'السليل']
const selectedCity = ref(null)

const maleColleges = ref([
  { name: 'كلية الهندسة', city: ['الخرج', 'وادي الدواسر'] },
  { name: 'كلية الصيدلة', city: ['الخرج'] },
  { name: 'كلية الطب', city: ['الخرج'] },
  { name: 'كلية هندسة وعلوم الحاسب', city: ['الخرج'] },
  { name: ' كلية الأدب والفنون التطبيقية بالدلم', city: ['الخرج'] },
  { name: 'الآدب والعلوم', city: ['وادي الدواسر'] },
  { name: 'كلية العلوم والدراسات الإنسانية', city: ['الخرج', 'السليل', 'الأفلاج', 'حوطة بن تميم'] },
  { name: 'كلية إدارة الأعمال', city: ['الخرج', 'حوطة بن تميم'] },
  { name: 'كليةالتربية', city: ['الخرج', 'وادي الدواسر'] },
  { name: 'كلية العلوم الطبية التطبيقية', city: ['الخرج', 'وادي الدواسر'] },
  { name: 'كلية طب الأسنان', city: ['الخرج'] }
])
const femaleColleges = ref([
  { name: 'كلية الهندسة', city: ['الخرج'] },
  { name: 'كلية الصيدلة', city: ['الخرج'] },
  { name: 'كلية الطب', city: ['الخرج'] },
  { name: 'كلية هندسة وعلوم الحاسب', city: ['الخرج', 'حوطة بن تميم'] },
  { name: 'كلية الآداب والعلوم الإنسانية', city: ['وادي الدواسر'] },
  { name: 'كلية العلوم والدراسات الإنسانية', city: ['الخرج', 'السليل', 'الأفلاج', 'حوطة بن تميم'] },
  { name: 'كلية إدارة الأعمال', city: ['الخرج', 'حوطة بن تميم'] },
  { name: 'كلية التربية', city: ['الخرج', 'وادي الدواسر', 'حوطة بن تميم'] },
  { name: 'كلية العلوم الطبية التطبيقية', city: ['الخرج', 'وادي الدواسر'] },
  { name: 'كلية طب الأسنان', city: ['الخرج'] }
])

const selectedGender = toRef(props, 'gender')
// Watch for changes in selectedGender and reset selectedCity to null
watch(selectedGender, () => {
  selectedCity.value = null
})
const filteredColleges = computed(() => {
  // Filter colleges based on the selected city
  if (!selectedGender.value || !selectedCity.value) return []
  const colleges = selectedGender.value == 'male' ? maleColleges.value : femaleColleges.value
  return colleges.filter((college) => college.city.includes(selectedCity.value))
})

const emit = defineEmits(['selectCityCollege'])

const selectCityCollege = (college) => {
  // Emit the selected college to the parent component
  emit('selectCityCollege', {
    college: college.name,
    city: selectedCity.value
  })
}
</script>

<style lang="scss" scoped>
.stdForm {
  margin-top: 50px;
  border: 1px solid #aaa;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  box-shadow: 0 0 8px #aaa;
}
</style>
