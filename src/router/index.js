import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Schedules from '../views/TheSchedules.vue'
import Profile from '../views/TheProfile.vue'
import LoginForm from '../views/LoginForm.vue'
import SignupForm from '../views/SignupForm.vue'
import forgotPassword from '../views/forgotPassword.vue'
import EmailVerification from '../views/EmailVerification.vue'
import getUser from '../utils/auth/getUser'
import ResetPassowrd from '../views/ResetPassword.vue'
import { getAuth, verifyPasswordResetCode, checkActionCode, applyActionCode } from 'firebase/auth';

const { user } = getUser()

const requireValidOobCode = async (to, from, next) => {
  const auth = getAuth();
  const oobCode = to.query.oobCode;

  if (!oobCode) {
    next({ name: 'home' }); // Redirect if no oobCode
    return;
  }

  try {
    // Check the type of operation and verify accordingly
    const info = await checkActionCode(auth, oobCode);

    if (info.operation === 'PASSWORD_RESET') {
      await verifyPasswordResetCode(auth, oobCode);
      next(); // Valid oobCode for password reset, proceed to the route
    } else if (info.operation === 'VERIFY_EMAIL') {
      await applyActionCode(auth, oobCode);
      next(); // Valid oobCode for email verification, proceed to the route
    } else {
      next({ name: 'home' }); // Redirect if the operation is neither
    }
  } catch (error) {
    next({ name: 'home' }); // Redirect if invalid oobCode
  }
};

// auth gurad to prevent unauthenticated users from accessing profile page
const requireAuth = (to, from, next) => {
  if (!user.value || !user.value.emailVerified) {
    next({ name: 'home' })
  } else {
    next()
  }
}

// auth gurad to prevent authenticated users from accessing login and signup page
const requireNoAuth = (to, from, next) => {
  if (user.value && user.value.emailVerified) {
    next({ name: 'home' })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: Schedules
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: requireAuth
    },
    {
      path: '/uploadData',
      name: 'uploadData',
      component: () => import('../views/uploadData.vue')
    },
    {
      path:'/login',
      name:'login',
      component: LoginForm,
      beforeEnter: requireNoAuth 
    },
    {
      path:'/signup',
      name:'signup',
      component: SignupForm,
      beforeEnter: requireNoAuth 
    },
    {
      path:'/forgotPassword',
      name:'forgotPassword',
      component: forgotPassword,
      beforeEnter: requireNoAuth
    },
    {
      path:'/emailVerification',
      name:'emailVerification',
      component: EmailVerification,
      beforeEnter: requireValidOobCode
    },
    {
      path:'/resetPassword',
      name:'resetPassword',
      component: ResetPassowrd,
      beforeEnter: requireValidOobCode

    }
  ]
})

export default router
