import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Schedules from '../views/Schedules.vue'
import Profile from '../views/Profile.vue'
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
    path: '/Profile',
    name: 'profile',
    component: Profile
   }
  ]
})

export default router
