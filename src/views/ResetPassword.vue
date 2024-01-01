<template>
    <div class="form-container">

    <h1>إعادة تعيين كلمة المرور</h1>
    <form>
        <span class="p-float-label">
        <Password v-model="newPassword" id="password" toggleMask :feedback="false" class="input-field" />
        <label for="password">كلمة المرور الجديدة</label>
      </span>
      <p v-if="message" :class="{'success-msg': isSuccess, 'error-msg': !isSuccess}">{{ message }}</p>
      <Button v-if="!isSuccess" class="submit-button" label="تأكيد" @click="resetPassword" />
      <Button v-else class="submit-button" label="تسجيل الدخول" @click="goToSigninPage" />
    </form>
    </div>
  </template>
  
<script setup>
import Password from 'primevue/password';
import Button from 'primevue/button';
import { ref , onBeforeUnmount } from 'vue';
import { auth } from '../firebase/confing';
import { confirmPasswordReset, signOut } from 'firebase/auth';  
import { useRouter } from 'vue-router';

const message = ref('')
const isSuccess = ref(false)
const newPassword = ref('')
const router = useRouter()
  const resetPassword = async () => {
    const actionCode = router.currentRoute.value.query.oobCode
    try {
      await confirmPasswordReset(auth, actionCode, newPassword.value)
        message.value = 'تمت عملية إعادة تعيين كلمة المرور بنجاح ! يمكنك الآن تسجيل الدخول'
        isSuccess.value = true

    } catch (error) {
        message.value = 'حدث خطأ ما، الرجاء المحاولة مرة أخرى'
        isSuccess.value = false
    }
    
  }
  const goToSigninPage = () => {
  router.push({ name: 'login' })
}
  onBeforeUnmount(() => {
    if (auth.currentUser) {
      signOut(auth)
    }
  })
</script>

<style scoped>
.error-msg {
  color: #ff3f80;
  font-size: 14px;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  width: 220px;
  line-height: 1.3;
}

.success-msg {
  color: #ff3f80;
  font-size: 14px;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  width: 220px;
  line-height: 1.3;
}

</style>