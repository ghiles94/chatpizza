import { createRouter, createWebHistory } from 'vue-router'
import MaisonView from '../views/MaisonView.vue'
const routes = [
  {
    path: '/',
    name: 'maison',
    component: MaisonView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
