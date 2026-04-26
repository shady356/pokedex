const BASE_URL = import.meta.env.VITE_POKE_API_URL

const get = (path) =>
  fetch(`${BASE_URL}${path}`).then(r => {
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
    return r.json()
  })

export const fetchPokemon = (id) => get(`/api/v2/pokemon/${id}`)
export const fetchPokemonForm = (id) => get(`/api/v2/pokemon-form/${id}`)
export const fetchPokemonSpecies = (id) => get(`/api/v2/pokemon-species/${id}`)
export const fetchMove = (name) => get(`/api/v2/move/${name}`)
export const fetchAbility = (name) => get(`/api/v2/ability/${name}`)
