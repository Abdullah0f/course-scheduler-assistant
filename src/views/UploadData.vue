<template>
  <div class="mx-5" :style="center ? 'margin: 0 auto' : ''">
    <Toast :pt="{ icon: 'ml-3' }" />
    <div class="flex align-content-center justify-content-center">
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
    </div>

    <Divider type="solid">أو</Divider>
    <div>
      <p class="">اختر ملف من القائمة التالية</p>
      <p class="">آخر تحديث: {{ lastUpdated }}</p>
    </div>

    <div class="">
      <RadioButton v-model="gender" inputId="m" name="gender" value="m" />
      <label for="m" class="ml-2">طلاب</label>

      <RadioButton v-model="gender" inputId="f" name="gender" value="f" />
      <label for="f" class="ml-2">طالبات</label>
    </div>
    <div class="my-3">
      <RadioButton class="" v-model="college" inputId="c" name="college" value="c" />
      <label for="c" class="ml-2">كلية الهندسة وعلوم الحاسب</label>

      <RadioButton v-model="college" inputId="e" name="college" value="e" />
      <label for="e" class="ml-2">كلية الهندسة </label>
      <div class="mt-2"></div>
      <RadioButton v-model="college" inputId="a" name="college" value="a" />
      <label for="a" class="ml-2">كلية إدارة الأعمال</label>
    </div>

    <br />
    <div class="flex align-content-center justify-content-center flex-wrap flex-column card">
      <h3 class="text-center mt-5">{{ collegeName }}</h3>
      <div>
        <div
          class="gap-4 md:gap-1 sm:gap-1 flex align-content-center justify-content-center flex-wrap mx-4 my-4"
        >
          <template v-for="(file, i) in supportedFiles" :key="i">
            <Button
              class="gap-2 shadow-4 fadein hover:bg-primary-reverse animation-duration-300 z-5 lg:my-1 lg:gap-1"
              :label="file.name"
              @click="fetchAndProcessFile(file.file)"
              v-if="file.gender === gender && file.college === college"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCourses } from '../utils/coursesFromHTML'
import FileUpload from 'primevue/fileupload'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { FILE_MSGS } from '../utils/msgs'
import { useCoursesStore } from '../stores/courses'
import { ref, watch } from 'vue'
import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'
import Divider from 'primevue/divider'
const props = defineProps({
  center: {
    type: Boolean,
    required: false,
    default: true
  }
})
const college = ref('c')
const gender = ref('m')

let collegeName = ref('كلية الهندسة وعلوم الحاسب')

const collegeMapping = {
  c: 'كلية الهندسة وعلوم الحاسب',
  a: 'كلية إدارة الأعمال',
  e: 'كلية الهندسة'
}

watch(college, (newCollege) => {
  collegeName.value = collegeMapping[newCollege]
})

const supportedFiles = [
  {
    college: 'c',
    gender: 'm',
    file: 'M_CS.html',
    name: 'علوم الحاسب'
  },
  {
    college: 'c',
    gender: 'm',
    file: 'M_IS.html',
    name: 'نظم المعلومات'
  },
  {
    college: 'c',
    gender: 'f',
    file: 'F_CS.html',
    name: 'علوم الحاسب'
  },
  {
    college: 'c',
    gender: 'f',
    file: 'F_IS.html',
    name: 'نظم المعلومات'
  },
  {
    college: 'c',
    gender: 'm',
    file: 'M_CE.html',
    name: 'هندسة الحاسب'
  },
  {
    college: 'c',
    gender: 'm',
    file: 'M_SWE.html',
    name: 'هندسة البرمجيات'
  },
  {
    college: 'c',
    gender: 'f',
    file: 'F_CE.html',
    name: 'هندسة الحاسب'
  },
  {
    college: 'c',
    gender: 'f',
    file: 'F_SWE.html',
    name: 'هندسة البرمجيات'
  },
  {
    college: 'e',
    gender: 'm',
    file: 'M_CivE.html',
    name: 'الهندسة المدنية'
  },
  {
    college: 'e',
    gender: 'm',
    file: 'M_EE.html',
    name: 'الهندسة الكهربائية'
  },
  {
    college: 'e',
    gender: 'm',
    file: 'M_ME.html',
    name: 'الهندسة الميكانيكية'
  },
  {
    college: 'e',
    gender: 'm',
    file: 'M_IE.html',
    name: 'الهندسة الصناعية'
  },
  {
    college: 'e',
    gender: 'f',
    file: 'F_EE.html',
    name: 'الهندسة الكهربائية'
  },
  {
    college: 'a',
    gender: 'm',
    file: 'M_MKT.html',
    name: 'التسويق'
  },
  {
    college: 'a',
    gender: 'm',
    file: 'M_FIN.html',
    name: 'المالية'
  },
  {
    college: 'a',
    gender: 'm',
    file: 'M_ACC.html',
    name: 'المحاسبة'
  },
  {
    college: 'a',
    gender: 'm',
    file: 'M_MIS.html',
    name: 'نظم المعلومات الإدارية'
  },
  {
    college: 'a',
    gender: 'm',
    file: 'M_HR.html',
    name: 'إدارة الموارد البشرية'
  },
  {
    college: 'a',
    gender: 'm',
    file: 'M_LAW.html',
    name: 'القانون'
  },
  {
    college: 'a',
    gender: 'f',
    file: 'F_FIN.html',
    name: 'المالية'
  },
  {
    college: 'a',
    gender: 'f',
    file: 'F_ACC.html',
    name: 'المحاسبة'
  },
  {
    college: 'a',
    gender: 'f',
    file: 'F_MIS.html',
    name: 'نظم المعلومات الإدارية'
  },
  {
    college: 'a',
    gender: 'f',
    file: 'F_HR.html',
    name: 'إدارة الموارد البشرية'
  },
  {
    college: 'a',
    gender: 'f',
    file: 'F_LAW.html',
    name: 'القانون'
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

<style scoped>
.card {
  border-radius: 50px;
  background: linear-gradient(145deg, #dddddd, #ffffff);
  box-shadow:
    25px 25px 50px #d0d0d0,
    -25px -25px 50px #ffffff;
}
</style>
