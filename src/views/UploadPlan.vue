<template>
  <div class="my-3 flex flex-column justify-content-center align-items-center" :style="center ? 'margin: 0 auto' : ''">
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
  </div>
  <div class="plan-container">
    <div class="filter-container">
      <Dropdown
        v-model="selectedStatus"
        :options="statusOptions"
        option-label="label"
        option-value="value"
        placeholder="الكل"
      />
    </div>
    <div v-for="item in usePlanStore().plan" :key="item.term" class="term-section">
      <h2>المستوى {{ item.termNumber }}</h2>
      <table>
        <thead>
          <tr>
            <th>رمز المادة</th>
            <th>اسم المادة</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in filteredCourses(item.courses)" :key="course.courseCode">
            <td>{{ course.courseCode }}</td>
            <td>{{ course.courseName }}</td>
            <td>{{ status[course.status] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { getCourses } from '../utils/coursesFromHTML'
import FileUpload from 'primevue/fileupload'
import Toast from 'primevue/toast'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { FILE_MSGS } from '../utils/msgs'
import { usePlanStore } from '../stores/userPlan'
import { extractPlanData } from '../utils/extractPlan'
import Dropdown from 'primevue/dropdown'
const props = defineProps({
  center: {
    type: Boolean,
    required: false,
    default: true
  }
})
const toast = useToast()
const status = {
  'Current Term': 'مختارة',
  'Not Started': 'لم تبدأ',
  Finished: 'منتهية'
}
const selectedStatus = ref('')

const statusOptions = [{ label: 'الكل', value: '' }].concat(
  Object.keys(status).map((key) => ({
    label: status[key],
    value: key
  }))
)

const filteredCourses = (courses) => {
  if (!selectedStatus.value) return courses
  return courses.filter((course) => course.status === selectedStatus.value)
}

const handleFileUpload = (event) => {
  const file = event.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target.result
        const parser = new DOMParser()
        const doc = parser.parseFromString(content, 'text/html')
        const result = extractPlanData(doc)
        usePlanStore().setPlan(result)
        toast.add({
          severity: 'success',
          summary: FILE_MSGS.SUMMARY.SUCCESS,
          detail: FILE_MSGS.SUCCESS,
          life: 3000
        })
      } catch (e) {
        console.error(e)
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
</script>
<style lang="scss" scoped>
.plan-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  .term-section {
    margin-bottom: 30px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    h2 {
      color: #007bff;
      margin-bottom: 20px;
      border-bottom: 2px solid #eeeeee;
      padding-bottom: 10px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;

      thead {
        tr {
          th {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px;
            border-bottom: 3px solid #0056b3;
          }
        }
      }

      tbody {
        tr {
          &:nth-child(odd) {
            background-color: #f2f2f2;
          }

          td {
            padding: 10px;
            border-bottom: 1px solid #dddddd;
          }

          &:last-child {
            td {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
}
</style>
