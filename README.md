# Pokedex

Pokedex is a small web application to list all pokemon with options of filtering. Each Pokemon can be viewed for more detailed information such as the pokemon's

* Type
* About
  * Abilities
  * Training data
  * Breeding
* Base stats

Built with Vue 3, TypeScript and Vite. Data comes from [PokéAPI](https://pokeapi.co).

Live: https://shady356.github.io/pokedex/

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm start
```

(`npm run dev` and `npm run serve` do the same thing.)

### Compiles and minifies for production

```
npm run build
```

### Previews the production build locally

```
npm run preview
```

### Lints files

```
npm run lint
```

### Type-checks the project

```
npm run type-check
```

### Deploys to GitHub Pages

```
npm run deploy
```

Pushes to `master` are also deployed automatically by the
[Deploy to GitHub Pages](.github/workflows/deploy_production.yml) workflow.

## Environment variables

| Variable             | Description               |
| -------------------- | ------------------------- |
| `VITE_POKE_API_URL`  | Base URL of the PokéAPI   |

Defaults live in `.env.development` (empty, so requests go through the dev proxy)
and `.env.production` (`https://pokeapi.co`).

## Customize configuration

See the [Vite configuration reference](https://vitejs.dev/config/) and
[`vite.config.ts`](vite.config.ts), which sets the GitHub Pages base path, the `@` →
`src` alias, global Sass imports, the dev proxy and the PWA manifest.
