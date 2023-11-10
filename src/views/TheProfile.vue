<template>
  <h1>الملف الشخصي</h1>
  <Button label="تسجيل الخروج" severity="danger"  @click="handleLogout"/>
  <h2>أنت مسجل الدخول الان بالبريد: {{ user.email }}</h2>
</template>

<script setup>
import Button from 'primevue/button';
import { auth } from '@/firebase/confing'
import { signOut } from 'firebase/auth'
import getUser from '@/utils/auth/getUser'
import { useRouter } from 'vue-router'

const router = useRouter()
const { user } = getUser()

const handleLogout = () => {
  signOut(auth)
  router.push({ name: 'Login' })
}



</script>

<style>

</style>