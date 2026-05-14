import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/pokedex",
    name: "Pokedex",
    children: [
      {
        name: "PokemonCardController",
        path: ":pokemonId",
        props: (route) => ({
          pokemonId: route.params.pokemonId,
          pokemonIndex: Number(route.query.i ?? 0),
        }),
        component: () =>
          import("../components/pokemon/PokemonCardController.vue"),
        meta: {
          showModal: true,
        },
      },
    ],
    component: () => import("../components/pokedex/Pokedex.vue"),
  },
  {
    path: "/types",
    name: "Types",
    component: () => import("../views/Types.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/Settings.vue"),
  },
  {
    path: "/settings/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: (_to, _from, savedPosition) => {
    if (savedPosition) return savedPosition;
    return { left: 0, top: 0 };
  },
  routes,
});

export default router;
