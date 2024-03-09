<template>
  <div>
    <div
      v-if="showDiv"
      ref="par"
      class="flex justify-content-between align-items-center bg-gray-200 shadow-8 m-0 h-2rem"
    >
      <div class="flex-grow-1 flex justify-content-center">
        <h5>
          نرجو منكم تعبئة الاستبيان
          <a
            href="https://docs.google.com/forms/d/1bS8rbYvnHFRq6rGYNRFM8qDVXRexek5oYqg0-smhi5M"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
            >من هنا</a
          >
        </h5>
      </div>
      <Button
        icon="pi pi-times"
        severity="danger"
        text
        rounded
        aria-label="Cancel"
        @click="removeDiv"
      />
    </div>
    <TabMenu
      v-if="windowWidth >= 768"
      :model="items"
      :pt="{ action: 'focus:shadow-none', icon: 'mr-0 ml-2', label: 'white-space-nowrap' }"
      :activeIndex="activeIndex"
      @update:activeIndex="changeTab"
    />

    <Menubar
      v-else
      :model="items"
      :pt="{
        icon: 'mr-0 ml-2'
      }"
    />
  </div>
</template>

<script setup>
import TabMenu from 'primevue/tabmenu'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import getUser from '@/utils/auth/getUser'
import { useReviewFormStore } from '@/stores/reviewForm'
const items = ref([])

const { user } = getUser()

watchEffect(() => {
  if (user.value && user.value.emailVerified) {
    items.value = [
      { label: ' الرئيسية ', icon: 'pi pi-fw pi-home', to: '/' },
      { label: ' الجداول ', icon: 'pi pi-fw pi-stopwatch', to: '/schedules' },
      { label: ' الملف الشخصي ', icon: 'pi pi-fw pi-user', to: '/profile' },
      { label: ' رفع ملف ', icon: 'pi pi-fw pi-upload', to: '/uploadData' },
      { label: ' رفع الخطة ', icon: 'pi pi-fw pi-upload', to: '/uploadPlan' }
    ]
  } else {
    items.value = [
      { label: ' الرئيسية ', icon: 'pi pi-fw pi-home', to: '/' },
      { label: ' الجداول ', icon: 'pi pi-fw pi-stopwatch', to: '/schedules' },
      { label: ' رفع ملف ', icon: 'pi pi-fw pi-upload', to: '/uploadData' },
      { label: 'الخطة ', icon: 'pi pi-calendar', to: '/uploadPlan' },
      { label: ' تسجيل الدخول', icon: 'pi pi-sign-in', to: '/login' }
    ]
  }
})
const showDiv = ref(true)
const par = ref(null)

const removeDiv = () => {
  par.value.classList.add('fadeOut') // Add your animation class here
  setTimeout(() => {
    showDiv.value = false
  }, 500) // Set timeout duration to match your animation duration
}
const activeIndex = ref(0)
const router = useRouter()

function changeTab(index) {
  activeIndex.value = index
  router.push(items.value[index].to)
}
const windowWidth = ref(window.innerWidth)

onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})
</script>
<style scoped>
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fadeOut {
  animation: fadeOut 0.1s ease-out forwards;
}
.link {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}
</style>
