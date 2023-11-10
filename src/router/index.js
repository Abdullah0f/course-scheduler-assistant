import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Schedules from '../views/TheSchedules.vue'
import Profile from '../views/TheProfile.vue'
import LoginForm from '../views/LoginForm.vue'
import SignupForm from '../views/SignupForm.vue'

import { auth } from '../firebase/confing'
import getUser from '../utils/auth/getUser'

// auth gurad to prevent unauthenticated users from accessing profile page
const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'home' })
  } else {
    next()
  }
}

// auth gurad to prevent authenticated users from accessing login and signup page
const requireNoAuth = (to, from, next) => {
  let user = auth.currentUser
  if (user) {
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
      name:'Login',
      component: LoginForm,
      beforeEnter: requireNoAuth 
    },
    {
      path:'/signup',
      name:'Signup',
      component: SignupForm,
      beforeEnter: requireNoAuth 
    }
  ]
})

export default router
