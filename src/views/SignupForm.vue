<template>
  <div class="form-container">

  <span v-if="!emailSent">
    <h1>إنشاء حساب جديد </h1>
    <form>
      <span class="p-float-label">
        <InputText id="username" v-model="username" class="input-field"/>
        <label for="username">اسم المستخدم</label>
      </span>
      <span class="p-float-label">
        <InputText id="email" v-model="email" class="input-field" />
        <label for="email" style="">البريد الإلكتروني</label>
      </span>
      <span class="p-float-label">
        <Password v-model="password" id="password" toggleMask :feedback="false" class="input-field" />
        <label for="password">كلمة المرور</label>
      </span>
      
      <div class="error-msg"> {{ error }}</div>
      <Button  class= "submit-button" label="تأكيد" @click="handleSubmit" />
    </form>
    <p>لديك حساب بالفعل؟
        <span style="
  color: #3f51b5;
  cursor: pointer;
  display: inline;"
     @click="goToSigninPage"> تسجيل الدخول</span>
     </p>
    </span>

     <div v-else class="text-center p-2 px-4 line-height-4	">
        <h3> نحن على وشك الانتهاء! لقد أرسلنا رسالة تحقق إلى بريدك الإلكتروني: 
          <div>{{ user.email }}</div>
          الرجاء فتح صندوق الوارد الخاص بك والنقر على الرابط لإتمام عملية تسجيل حسابك،
          وإذا لم تجد الرسالة، تحقق من مجلد الرسائل غير المرغوب فيها (spam).</h3>
        <span v-if="disableButton" class="ml-3 text-500"> {{ secondsCounter }}ث</span>
        <Button label="إعادة إرسال رسالة التحقق" @click="resendVerificationEmail" :disabled="disableButton"/> 
        <div>{{ error }}</div>
      </div>

  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { ref, onBeforeUnmount, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import useSignup from '../utils/auth/useSignup'
import getUser from '../utils/auth/getUser'
import { auth } from '../firebase/confing'
import { signOut } from 'firebase/auth'
const username = ref('')
const password = ref('')
const email = ref('')
const emailSent = ref(false)
const disableButton = ref(false)
const secondsCounter = ref(0)

const router = useRouter()
const { user } = getUser()
const { error, signup , sendVerificationEmail} = useSignup() 

const handleSubmit = async () => {
  await signup(email.value,password.value)
  if (!error.value) {
    emailSent.value = true
    disableButton.value = true
    startCounter()
  }
}
const goToSigninPage = () => {
  router.push({ name: 'login' })
}
const resendVerificationEmail = async () => {
  error.value = ''
  await sendVerificationEmail(user.value)
  if (!error.value) {
    disableButton.value = true
    startCounter()
  }
}

const startCounter = () => {
  secondsCounter.value = 60; 
  // 1 minute delay before enabling the button again
  const interval = setInterval(() => {
    secondsCounter.value--
    if (secondsCounter.value === 0) {
      clearInterval(interval)
      disableButton.value = false
    }
  }, 1000)
}

onBeforeUnmount(() => {
  error.value = '' // Reset the error message when leaving the signup page
})

onUnmounted(() => {
  signOut(auth)
})

</script>

<style >

</style>

