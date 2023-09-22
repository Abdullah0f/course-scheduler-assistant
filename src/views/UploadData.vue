<template>
    <div>
      <FileUpload mode="basic" auto choose-label="اختر ملف" class="my-3 gap-2 shadow-4 fadeinup hover:bg-primary-reverse" :maxFileSize="1000000" :custom-upload="true" @uploader="handleFileUpload" />
    <div v-if="parsedContent">
      <h2>Parsed HTML Content:</h2>
      <div v-html="parsedContent"></div>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getCourses } from '../utils/coursesFromHTML';
import FileUpload from 'primevue/fileupload';

const parsedContent = ref(null);
const handleFileUpload =  event => {
  const file = event.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      showCourses(getCourses(content));
    };
    reader.readAsText(file);
  }
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const showCourses = (courses) => {
  console.log(courses)
  const html = Object.keys(courses)
    .map((code) => {
        const courseArray = courses[code];
        const firstCourse = courseArray[0];
        
        let periodsHTML = '';

        courseArray.forEach(course => {
            periodsHTML += `
                <div class="bg-gray-100 p-3 mb-2">
                    ${course.periods.map(period => `
                        <div class="bg-blue-${100 * random(1, 5)}">
                            <p>اليوم: ${period.days}</p>
                            <p>النوع: ${period.classType}</p>
                            <p>الوقت: ${period.time}</p>
                            <p>المحاضر: ${period.instructor}</p>
                            <p>المكان: ${period.location}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        });

        return `
            <div>
                <h3>${firstCourse.code} - ${firstCourse.name}</h3>
                <p>الشعبة: ${firstCourse.classCode}</p>
                <p>الساعات: ${firstCourse.hours}</p>
                <p>مفتوحه: ${firstCourse.open}</p>
                <p>المحاضر: ${firstCourse.instructor}</p>
                <p>عدد الشعب: ${courseArray.length}</p>
                <p>الامتحان: ${firstCourse.exam}</p>
                ${periodsHTML}
            </div>
        `;
    })
    .join('');

parsedContent.value = html;

};
</script>

<style lang="scss" scoped>

</style>