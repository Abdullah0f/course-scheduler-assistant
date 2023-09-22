<template>
    <div>
        <input type="file" @change="handleFileUpload">
    <div v-if="parsedContent">
      <h2>Parsed HTML Content:</h2>
      <div v-html="parsedContent"></div>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getCourses } from '../utils/coursesFromHTML';

const parsedContent = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      showCourses(getCourses(content));
    };
    reader.readAsText(file);
  }
};
const showCourses = (courses) => {
  console.log(courses)
    const html = Object.keys(courses)
    .map((code) => {
      const course = courses[code][0]
      return `
          <div>
              <h3>${course.code} - ${course.name} </h3>
              <p>النوع: ${course.type}</p>
              <p>الساعات: ${course.hours}</p>
              <p>الشعبة: ${course.class}</p>
              <p>مفتوحه: ${course.open}</p>
              <p>المحاضر: ${course.instructor}</p>
              <p>الوقت: ${course.time}</p>
              <p>عدد الشعب: ${courses[code].length}</p>
              <p>الامتحان: ${course.exam}</p>
          </div>
          `
    })
    .join('')
  parsedContent.value = html
};
</script>

<style lang="scss" scoped>

</style>