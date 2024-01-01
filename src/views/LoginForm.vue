<template>
  <div class="form-container">
    <h1>تسجيل الدخول</h1>
    <form>
      <span class="p-float-label">
        <InputText id="email" v-model="email" class="input-field" />
        <label for="email">االبريد الإلكتروني</label>
      </span>
      <span class="p-float-label">
        <Password v-model="password" id="password" toggleMask :feedback="false" class="input-field" />
        <label for="password">كلمة المرور</label>
      </span>
      <p class="forgot-password" @click="handleForgot">نسيت كلمة المرور</p>
      <div class="error-msg"> {{ error }}</div>
      <Button class="submit-button" label="تسجيل الدخول" @click="handleSubmit" />
    </form>
    <p>ليس لديك حساب؟ <span class="sign-up" @click="goToSignupPage">إنشاء حساب جديد</span> </p>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import useLogin from '../utils/auth/useLogin';
import { useScheduleStore } from '../stores/saveSchedule';

const email = ref('')
const password = ref('')
const router = useRouter()

const { error, login } = useLogin()

const handleSubmit = async () => {
  await login(email.value, password.value)
  if (!error.value) {
    router.push({ name: 'home' })
    const scheduleStore = useScheduleStore()
    await scheduleStore.loadUserSchedules()
  }
}
const goToSignupPage = () => {
  router.push({ name: 'signup' })
}

const handleForgot = () => {
  router.push({ name: 'forgotPassword' })
}

onBeforeUnmount(() => {
  error.value = '' // Reset the error message when leaving the signin page
})

</script>

<style>
.form-container {
  width: 90%;
  max-width: 960px;
  margin: 80px auto;
  border-radius: 20px;
  box-shadow: 2px 4px 6px rgba(28, 6, 49, 0.1);
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 20px 0;
}

.p-float-label {
  margin: 25px 0;
}

.p-inputtext,
.submit-button {
  width: 220px;
}

.sign-up {
  color: #3f51b5;
  cursor: pointer;
  display: inline;
}

.p-float-label>label {
  right: 0.75rem;
}

.error-msg {
  color: #ff3f80;
  font-size: 14px;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  width: 220px;
  line-height: 1.3;
}

.forgot-password {
  font-size: 0.9rem;
  color: #3f51b5;
  margin-top: -0.8rem;
  margin-bottom: 1.2rem;
  cursor: pointer;
}

/* for the eye icon of the password  */
.form-container .p-input-icon-right>svg:last-of-type,
.p-input-icon-right>i:last-of-type {
  right: auto;
  left: 0.75rem;
  display: inline-block;
  position: absolute;
  padding-left: 2.5px;
  padding-right: 0;
}

.form-container .p-input-icon-right > .p-inputtext {
  padding-left: 2.5rem;
  padding-right: 0.75rem;
}
</style>
