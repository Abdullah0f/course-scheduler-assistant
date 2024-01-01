<template>
  <div>
    <Button @click="loadData">بيانات تجريبية</Button>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import exampleData from '../../utils/coursesExample.json'
import { useCoursesStore } from '@/stores/courses'

const loadData = () => {
  console.log(exampleData)
  const coursesStore = useCoursesStore()
  coursesStore.setCourses(exampleData.courses)
}
</script>

<style lang="scss" scoped></style>
