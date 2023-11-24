<template>
  <div>
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
        // action: 'focus:shadow-none', 
      icon: 'mr-0 ml-2',
      //  label: 'white-space-nowrap' 
       }"
      />

      <!-- :activeIndex="activeIndex" -->
      <!-- @update:activeIndex="changeTab" -->
  </div>
</template>

<script setup>
import TabMenu from 'primevue/tabmenu'
import Menubar from 'primevue/menubar'
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import getUser from '@/utils/auth/getUser'
const items = ref([])

const { user } = getUser()

watchEffect(() => {
  if (user.value && user.value.emailVerified) {
    items.value = [
  { label: ' الرئيسية ', icon: 'pi pi-fw pi-home', to: '/' },
  { label: ' الجداول ', icon: 'pi pi-fw pi-stopwatch', to: '/schedules' },
  { label: ' الملف الشخصي ', icon: 'pi pi-fw pi-user', to: '/profile' },
  { label: ' رفع ملف ', icon: 'pi pi-fw pi-upload', to: '/uploadData' }
  ]
  } else  {
    items.value = [
  { label: ' الرئيسية ', icon: 'pi pi-fw pi-home', to: '/' },
  { label: ' الجداول ', icon: 'pi pi-fw pi-stopwatch', to: '/schedules' },
  { label: ' رفع ملف ', icon: 'pi pi-fw pi-upload', to: '/uploadData' },
  { label: ' تسجيل الدخول', icon: 'pi pi-sign-in', to: '/login' }
  ]
  }

})


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
