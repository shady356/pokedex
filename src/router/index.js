import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import('../views/Home.vue'),
  },
  {
    path: '/pokedex',
    name: 'Pokedex',
    children: [
      {
        name: 'PokemonCardController',
        path: ':pokemonId',
        props: true,
        component: () => import('../components/pokemon/PokemonCardController.vue'),

        meta: {
          showModal: true,
        },
      },
    ],
    component: () =>
      import('../components/pokedex/Pokedex.vue'),
  },
  {
    path: '/types',
    name: 'Types',
    component: () =>
      import('../views/Types.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () =>
      import('../views/Settings.vue'),
  },
  {
    path: '/settings/about',
    name: 'About',
    component: () =>
      import('../views/About.vue'),
  }
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

const router = new VueRouter({
  scrollBehavior,
  routes,
  mode: 'hash',
})

export default router
