import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tic-tac-toe',
    name: 'Tic Tac Toe',
    component: () => import('@/views/Games/TicTacToe.vue')
  },
  {
    path: '/simon',
    name: 'Simon',
    component: () => import('@/views/Games/Simon.vue')
  },
  {
    path: '/memorama',
    name: 'Memorama',
    component: () => import('@/views/Games/Memorama.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
