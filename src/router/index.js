import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "pokedex" */ '../views/Home.vue')
  },
  {
    path: '/pokedex',
    name: 'Pokedex',
    component: () => import(/* webpackChunkName: "pokedex" */ '../views/Pokedex.vue')
  },
  {
    path: '/pokedex/:pokemonId',
    props: true,
    name: 'Pokemon',
    component: () => import(/* webpackChunkName: "pokemon" */ '../views/Pokemon.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
