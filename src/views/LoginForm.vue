<template>
  <div class="container">
    <h1>تسجيل الدخول</h1>
    <form>
      <span class="p-float-label">
        <InputText id="email" v-model="email" class="input-field"/>
        <label for="email">االبريد الإلكتروني</label>
      </span>
      <span class="p-float-label">
        <Password v-model="password" inputId="password" toggleMask :feedback="false" class="input-field"  />  
        <label for="password">كلمة المرور</label>
      </span>
      <div class="error"> {{ error }}</div>
      <Button label="تسجيل الدخول" @click="handleSubmit" />
    </form>
    <p>ليس لديك حساب؟ <span class="sign-up" @click="goToSignupPage">إنشاء حساب جديد</span> </p>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { ref} from 'vue';
import { useRouter } from 'vue-router';
import useLogin from '../utils/auth/useLogin';

const email = ref('')
const password = ref('')

const router = useRouter()

const { error, login } = useLogin()

const handleSubmit = async () => {
  await login(email.value, password.value)
  if (!error.value) {
    router.push({ name: 'home' })
  }
}
const goToSignupPage = () => {
  router.push({ name: 'Signup' })
}
</script>

<style scoped>
.container {
  width: 90%;
  max-width: 960px;
  margin: 80px auto;
  border-radius: 20px;
  box-shadow: 2px 4px 6px rgba(28, 6, 49, 0.1);
  background: white;
  display: flex; 
  flex-direction: column;
  align-items: center;

}

.p-float-label {
  margin: 25px 0;
}
.input-field {
    width: 100% ; 
    
    
  }
.sign-up {
  color: #3f51b5;
  cursor: pointer;
  display: inline;
}

.p-float-label > label {
    right: 0.75rem;
}

button {
  width: 100%;
}
.error {
  color: #ff3f80;
  font-size: 14px;
  margin: 5px 0;
  max-width: 200px;
}

 
 
</style>
