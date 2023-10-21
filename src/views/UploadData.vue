<template>
  <div style="margin: 0 auto" class="w-max">
    <Toast :pt = "{icon: 'ml-3'}" />
    <FileUpload
      mode="basic"
      auto
      choose-label="اختر ملف"
      class="my-3 gap-2 shadow-4 fadeinup hover:bg-primary-reverse animation-duration-300 z-5"
      :max-file-size="3000000"
      :custom-upload="true"
      accept="text/html"
      :invalid-file-type-message="FILE_MSGS.FILE_TYPE"
      :invalid-file-size-message="FILE_MSGS.FILE_SIZE"
      @uploader="handleFileUpload"
    />
  </div>
</template>

<script setup>
import { getCourses } from '../utils/coursesFromHTML'
import FileUpload from 'primevue/fileupload'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import {FILE_MSGS} from '../utils/msgs'
import { useCoursesStore } from '../stores/courses'

const toast = useToast()
const handleFileUpload = (event) => {
  const file = event.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
        try {
        const content = e.target.result
        const courses = getCourses(content)
        console.log(courses)
        useCoursesStore().setCourses(courses)
        toast.add({ severity: 'success', summary: FILE_MSGS.SUMMARY.SUCCESS, detail: FILE_MSGS.SUCCESS, life: 3000 })
      } catch (e) {
        console.log(e)
        toast.add({ severity: 'error', summary: FILE_MSGS.SUMMARY.ERROR, detail: FILE_MSGS.ERROR, life: 3000 })
      }
    }
    reader.onerror = (e) => {
      console.log(e)
      toast.add({ severity: 'error', summary: FILE_MSGS.SUMMARY.ERROR, detail: FILE_MSGS.READ_ERROR, life: 3000 })
    }
    reader.readAsText(file)
  }
  else {
    toast.add({ severity: 'warn', summary: FILE_MSGS.SUMMARY.ERROR, detail: FILE_MSGS.NO_FILE, life: 3000 })
  }
}
</script>