import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pokedex',
    component: () => import(/* webpackChunkName: "pokedex" */ '../views/Pokedex.vue')
  },
  {
    path: '/:pokemonId',
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
  routes
})

export default router
