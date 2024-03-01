import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Schedules from '../views/TheSchedules.vue'
import Profile from '../views/TheProfile.vue'
import LoginForm from '../views/LoginForm.vue'
import SignupForm from '../views/SignupForm.vue'
import forgotPassword from '../views/forgotPassword.vue'
import EmailVerification from '../views/EmailVerification.vue'
import getUser from '../utils/auth/getUser'
import ResetPassword from '../views/ResetPassword.vue'
import { getAuth, checkActionCode } from 'firebase/auth'

const { user } = getUser()

const requireActionHandler = (to, from, next) => {
  if (to.query.fromActionHandler) {
    next()
  } else {
    next({ name: 'home' })
  }
}

const actionHandlerGuard = async (to, from, next) => {
  const auth = getAuth()
  const oobCode = to.query.oobCode
  if (!oobCode) {
    next({ name: 'home' })
    return
  }

  try {
    const info = await checkActionCode(auth, oobCode)
    switch (info.operation) {
      case 'PASSWORD_RESET':
        next({ name: 'resetPassword', query: { ...to.query, fromActionHandler: true } })
        break
      case 'VERIFY_EMAIL':
        next({ name: 'emailVerification', query: { ...to.query, fromActionHandler: true } })
        break
      default:
        next({ name: 'home' })
    }
  } catch (error) {
    next({ name: 'home' })
  }
}

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
      path: '/uploadPlan',
      name: 'uploadPlan',
      component: () => import('../views/uploadPlan.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm,
      beforeEnter: requireNoAuth
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupForm,
      beforeEnter: requireNoAuth
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: forgotPassword,
      beforeEnter: requireNoAuth
    },
    {
      path: '/emailVerification',
      name: 'emailVerification',
      component: EmailVerification,
      beforeEnter: requireActionHandler
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: ResetPassword,
      beforeEnter: requireActionHandler
    },
    {
      path: '/actionHandler',
      name: 'actionHandler',
      beforeEnter: actionHandlerGuard
    }
  ]
})

export default router
