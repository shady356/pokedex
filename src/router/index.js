import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/pokeview',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "pokedex" */ '../views/Home.vue'),
  },
  {
    path: '/pokeview/pokedex',
    name: 'Pokedex',
    children: [
      {
        name: 'Pokemon',
        path: ':pokemonId',
        props: true,
        component: () => import('../components/pokemon/Pokemon.vue'),

        meta: {
          showModal: true,
        },
      },
    ],
    component: () =>
      import(
        /* webpackChunkName: "pokedex" */ '../components/pokedex/Pokedex.vue'
      ),
  },
  {
    path: 'pokeview/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
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
  mode: 'history',
})

export default router
