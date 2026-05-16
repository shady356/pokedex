const BASE_URL = import.meta.env.VITE_POKE_API_URL as string;

const get = (path: string): Promise<any> =>
  fetch(`${BASE_URL}${path}`).then((r) => {
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return r.json();
  });

export const fetchPokemon = (id: number | string) => get(`/api/v2/pokemon/${id}`);
export const fetchPokemonForm = (id: number | string) => get(`/api/v2/pokemon-form/${id}`);
export const fetchPokemonSpecies = (id: number | string) => get(`/api/v2/pokemon-species/${id}`);
export const fetchMove = (name: string) => get(`/api/v2/move/${name}`);
export const fetchAbility = (name: string) => get(`/api/v2/ability/${name}`);
export const fetchGeneration = (nameOrId: string | number) => get(`/api/v2/generation/${nameOrId}`);
export const fetchAllPokemonSpecies = () => get(`/api/v2/pokemon-species/?limit=100000`);
export const fetchType = (name: string) => get(`/api/v2/type/${name}`);
