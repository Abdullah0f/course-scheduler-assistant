<template>
  <div class="form-container">
    <h1>إعادة تعيين كلمة المرور</h1>
    <form>
      <span class="p-float-label">
        <InputText id="email" v-model="email" class="input-field" />
        <label for="email">البريد الإلكتروني</label>
      </span>
      <p class="error-msg">{{ error }}</p>
      <Button label="تأكيد" @click="handleClick" class="submit-button" />
      <!-- <Message class="ltr" v-if="showMessage" severity="success">If your email address is registered with us, you will receive an email to reset your password. </Message> -->
    </form>

    <Message v-if="showMessage" severity="success"
      >إذا كان عنوان بريدك الإلكتروني مسجلاً لدينا، ستتلقى رسالة عبر البريد الإلكتروني لإعادة تعيين
      كلمة المرور</Message
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import useResetPassword from '../utils/auth/useResetPassword'
import Message from 'primevue/message'
const email = ref('')
const showMessage = ref(false)

const { error, resetPassword } = useResetPassword()

const handleClick = async () => {
  showMessage.value = false
  await resetPassword(email.value)
  if (!error.value) {
    showMessage.value = true
  }
}
</script>

<style>
.form-container .p-message .p-icon:not(.p-message-close-icon) {
  margin: 0 0 0 0.5rem;
}

.form-container .p-message.p-message-success {
  border-width: 0 6px 0 0;
}

.form-container .p-message.p-message-success .p-message-close {
  margin-right: 0.5rem;
}
</style>
