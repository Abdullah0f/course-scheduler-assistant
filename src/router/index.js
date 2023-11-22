import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Schedules from '../views/TheSchedules.vue'
import Profile from '../views/TheProfile.vue'
import LoginForm from '../views/LoginForm.vue'
import SignupForm from '../views/SignupForm.vue'
import forgotPassword from '../views/forgotPassword.vue'
import getUser from '../utils/auth/getUser'

const { user } = getUser()

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
    }
   
  ]
})

export default router
