<template>
  <div
    class="stdForm flex flex-column gap-5 mb-5 justify-content-center fadein animation-duration-1000"
  >
    <div class="flex justify-content-center">
      <Dropdown
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
        placeholder="ادخل المقر"
        class="ml-2 w-full justify-content-center md:w-14rem"
      />
    </div>
    <!-- College selection logic here -->
    <div class="flex flex-column gap-2 scalein animation-duration-1000" v-if="selectedCity">
      <Button
        v-for="(college, i) in filteredColleges"
        :key="i"
        link
        :label="college.name"
        @click="selectCollege(college)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
// toRef is used to create a reference to a prop, so that we can use it in computed properties
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'

const props = defineProps({
  city: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['collegeSelected'])

const cities = [
  { name: 'الخرج' },
  { name: 'وادي الدواسر' },
  { name: 'الدراسات العليا' },
  { name: 'حوطة بن تميم' },
  { name: 'الأفلاج' },
  { name: 'السليل' }
]

// const selectedCity = toRef(props, 'city')

const selectedCity = ref(props.city)
const maleColleges = ref([
  { name: 'كلية الهندسة', city: ['الخرج', 'وادي الدواسر'] },
  { name: 'كلية الصيدلة', city: ['الخرج'] },
  { name: 'كلية الطب', city: ['الخرج'] },
  { name: 'كلية هندسة وعلوم الحاسب', city: ['الخرج'] },
  {
    name: 'كلية الأدب والفنون التطبيقية بالدلم',
    city: ['الخرج', 'السليل', 'الأفلاج', 'حوطة بن تميم']
  },
  { name: 'كلية العلوم والدراسات الإنسانية', city: ['الخرج', 'السليل', 'الأفلاج', 'حوطة بن تميم'] },
  { name: 'كلية إدارة الأعمال', city: ['الخرج'] },
  { name: 'كليةالتربية', city: ['الخرج'] },
  { name: 'كلية العلوم الطبية التطبيقية', city: ['الخرج'] },
  { name: 'كلية طب الأسنان', city: ['الخرج'] }
])

const filteredColleges = computed(() => {
  // Filter colleges based on the selected city
  console.log("Selected:"+selectedCity.value)
  console.log(maleColleges.value)
  return maleColleges.value.filter((college) => college.city.includes(selectedCity.value))
})

const selectCollege = (college) => {
  // Emit the selected college to the parent component
  emit('collegeSelected', college)
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
