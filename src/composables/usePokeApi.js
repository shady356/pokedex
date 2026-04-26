import { computed, unref } from 'vue'
import { useQuery, useQueries, useQueryClient } from '@tanstack/vue-query'
import { fetchPokemon, fetchPokemonSpecies, fetchMove } from '@/service/pokeApi.js'

export { useQueryClient }

export const STALE = Infinity

export const usePokemon = (id) => useQuery({
  queryKey: computed(() => ['pokemon', unref(id)]),
  queryFn: () => fetchPokemon(unref(id)),
  staleTime: STALE,
  enabled: computed(() => !!unref(id)),
})

export const usePokemonSpecies = (id) => useQuery({
  queryKey: computed(() => ['pokemon-species', unref(id)]),
  queryFn: () => fetchPokemonSpecies(unref(id)),
  staleTime: STALE,
  enabled: computed(() => !!unref(id)),
})

export const useMoveDetails = (moveNames) => useQueries({
  queries: computed(() => unref(moveNames).map(name => ({
    queryKey: ['move', name],
    queryFn: () => fetchMove(name),
    staleTime: STALE,
  }))),
})
