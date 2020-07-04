import Vue from 'vue'
import VueRouter from 'vue-router'
import Busca from '../views/Busca.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Busca',
    component: Busca
  },
  {
    path: '/champion/:id',
    name: 'Campeão',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Champion.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
