import { createRouter, createWebHistory } from 'vue-router'

import PasswordView from "@/views/PasswordView.vue";
import EmailView from "@/views/EmailView.vue";

const routes = [
  {
    path: '/',
    component: PasswordView
  },
  {
    path: '/email',
    component: EmailView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
