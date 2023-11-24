<template>
  <div class="form-container">
    <h1 class="mb-6">الملف الشخصي</h1>
    

      <div class="info-container"> 
        <h3 >اسم المستخدم</h3>
        <InputText id="username" disabled class="input-field" v-model=username  />

        <h3 >البريد الإلكتروني </h3>
        <InputText id="email" disabled class="input-field" v-model=email  />
        
        <h3> كلمة المرور</h3> 
        <div class="password-container">
          <Password id="password" disabled="" class="input-field " v-model="dummyPassword"  />   
          <Button  label="تعديل" class="text-sm p-button-text " @click="confirmResetPassword($event)"/>
          <ConfirmPopup></ConfirmPopup>
          <Toast />
        </div>       
        
      </div>

    <Divider type="solid" class="w-11">
      <b class="text-2xl">الجداول المفضلة</b>
    </Divider>
    <div ></div>
    <p  class="text-lg">لا يوجد لديك جداول مفضلة حالياً</p>
    <Button severity="danger" rounded label="تسجيل الخروج" icon="pi pi-sign-out ml-2 mr-0"  @click="handleLogout"   />
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { auth } from '@/firebase/confing'
import { signOut } from 'firebase/auth'
import getUser from '@/utils/auth/getUser'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import Password from 'primevue/password';
import Divider from 'primevue/divider';
import ConfirmPopup from 'primevue/confirmpopup';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import useResetPasword from '../utils/auth/useResetPassword';

const confirm = useConfirm();
const toast = useToast();
const {error, resetPassword } = useResetPasword()
const username = ref('')
const dummyPassword = "********"
const router = useRouter()
const { user } = getUser()
const email = ref(user.value.email)

const handleLogout = () => {
  signOut(auth)
  router.push({ name: 'login' })
}

const confirmResetPassword =  (event) => {
  confirm.require({
    target: event.currentTarget,
    message: "هل أنت متأكد من تغيير كلمة المرور؟",
    acceptLabel: "نعم",
    rejectLabel: "إلغاء",
    accept: async() => {
       await resetPassword(email.value)
       if (!error.value) {
        toast.add({
          severity: "success",
          summary: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
          life: 6000,
        }) }
      else {
        toast.add({
          severity: "error",
          summary: "حدث خطأ ما أثناء إرسال رابط إعادة تعيين كلمة المرور",
          life: 6000,
        })
      }
    }
  })
}

</script>

<style scoped >

@media screen and (max-width: 600px) {
  .info-container {
    display: flex !important;
    flex-direction: column !important;
    gap: 0.5rem !important;
  }

  .info-container h3, 
  .info-container .input-field,
  .info-container .password-container {
    width: 220px  ;
  }

  .password-container {
    display: flex;
    flex-direction: row ; 
    align-items: center ; 
    justify-content: space-between ; 
  }

  .password-container .input-field {
    flex-grow: 1;
    margin-right: 0.5rem; 
  }
  .text-2xl {
    font-size: 1.25rem !important;
  }
}


.form-container {
  text-align: center;
}


.info-container {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1rem; 
  align-items: center;
  margin-bottom: 1rem;
}

.h3 {
  justify-self: end; 
}

.input-field {
  justify-self: start; 
}


</style>

<style>
.p-toast .p-toast-message .p-toast-message-content .p-toast-message-icon.p-icon {
  margin-left: 1rem ;
  }

  .p-toast .p-toast-message.p-toast-message {
    border-width: 0 6px 0 0;
  }
</style>