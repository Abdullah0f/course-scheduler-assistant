<template>
  <div class="w-max" :style="center ? 'margin: 0 auto' : ''">
    <Toast :pt="{ icon: 'ml-3' }" />
    <FileUpload
      mode="basic"
      auto
      choose-label="اختر ملف"
      class="my-3 gap-2 shadow-4 hover:bg-primary-reverse animation-duration-300 z-5"
      :class="center ? 'fadeinup' : ''"
      :max-file-size="3000000"
      :custom-upload="true"
      accept="text/html"
      :invalid-file-type-message="FILE_MSGS.FILE_TYPE"
      :invalid-file-size-message="FILE_MSGS.FILE_SIZE"
      @uploader="handleFileUpload"
    />

    <div>
      <p class="">او</p>
      <p class="">اختر ملف من القائمة التالية</p>
      <p class="">آخر تحديث: {{ lastUpdated }}</p>
    </div>
    <template v-for="file in supportedFiles">
      <Button
        class="my-3 gap-2 shadow-4 hover:bg-primary-reverse animation-duration-300 z-5"
        :class="center ? 'fadeinup' : ''"
        :label="file.name"
        @click="fetchAndProcessFile(file.file)"
      />
    </template>
  </div>
</template>

<script setup>
import { getCourses } from '../utils/coursesFromHTML'
import FileUpload from 'primevue/fileupload'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { FILE_MSGS } from '../utils/msgs'
import { useCoursesStore } from '../stores/courses'
import Button from 'primevue/button'
const props = defineProps({
  center: {
    type: Boolean,
    required: false,
    default: true
  }
})
const supportedFiles = [
  {
    file: 'CS.html',
    name: 'علوم الحاسب'
  },
  {
    file: 'IS.html',
    name: 'نظم المعلومات'
  }
]
const lastUpdated = '2023-01-13 4:45 PM'
const toast = useToast()
const handleFileUpload = (event) => {
  const file = event.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target.result
        const courses = getCourses(content)
        useCoursesStore().setCourses(courses)
        toast.add({
          severity: 'success',
          summary: FILE_MSGS.SUMMARY.SUCCESS,
          detail: FILE_MSGS.SUCCESS,
          life: 3000
        })
      } catch (e) {
        toast.add({
          severity: 'error',
          summary: FILE_MSGS.SUMMARY.ERROR,
          detail: FILE_MSGS.ERROR,
          life: 3000
        })
      }
    }
    reader.onerror = (e) => {
      toast.add({
        severity: 'error',
        summary: FILE_MSGS.SUMMARY.ERROR,
        detail: FILE_MSGS.READ_ERROR,
        life: 3000
      })
    }
    reader.readAsText(file)
  } else {
    toast.add({
      severity: 'warn',
      summary: FILE_MSGS.SUMMARY.ERROR,
      detail: FILE_MSGS.NO_FILE,
      life: 3000
    })
  }
}

const processFileContent = (content) => {
  try {
    const courses = getCourses(content)
    useCoursesStore().setCourses(courses)
    toast.add({
      severity: 'success',
      summary: FILE_MSGS.SUMMARY.SUCCESS,
      detail: FILE_MSGS.SUCCESS,
      life: 3000
    })
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: FILE_MSGS.SUMMARY.ERROR,
      detail: FILE_MSGS.ERROR,
      life: 3000
    })
  }
}

const fetchAndProcessFile = async (filename) => {
  try {
    const response = await fetch(`/htmls/${filename}`)
    if (!response.ok) throw new Error('Network response was not ok')
    const content = await response.text()
    processFileContent(content)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: FILE_MSGS.SUMMARY.ERROR,
      detail: FILE_MSGS.READ_ERROR,
      life: 3000
    })
  }
}
</script>
