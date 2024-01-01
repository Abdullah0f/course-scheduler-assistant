<template>
   <div class="form-container">

   <div class="text-center p-2 px-4 line-height-4	">
      <h3 v-if="message"> </h3>
        <Button label="تسجيل الدخول" @click="goToSigninPage" />
    </div>

</div>
  </template>
  
<script setup>
import { applyActionCode, verifyBeforeUpdateEmail } from 'firebase/auth';
import Button from 'primevue/button';
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase/confing';
const router = useRouter()
const message = ref('')
const goToSigninPage = () => {
  router.push({ name: 'login' })
}

const verifyEmail = async () => {
  const actionCode = router.currentRoute.value.query.oobCode
  try {
    await applyActionCode(auth, actionCode)
    message.value = 'تمت عملية التحقق من حسابك بنجاح ! يمكنك الآن تسجيل الدخول'
  } catch (error) {
    message.value = 'حدث خطأ ما، الرجاء المحاولة مرة أخرى'
  }
}

onMounted(() => {
    verifyEmail()
})
</script>
  
  <style scoped>
  
  </style>