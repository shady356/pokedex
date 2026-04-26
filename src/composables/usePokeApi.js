import { computed, unref, ref, watch } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
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

export const useMoveDetails = (moveNames) => {
  const queryClient = useQueryClient()
  const results = ref([])

  watch(
    moveNames,
    async (names) => {
      results.value = []
      if (!names.length) return
      const data = await Promise.all(
        names.map(name =>
          queryClient.fetchQuery({
            queryKey: ['move', name],
            queryFn: () => fetchMove(name),
            staleTime: STALE,
          })
        )
      )
      results.value = data.map(d => ({ data: d, isSuccess: true }))
    },
    { immediate: true }
  )

  return results
}
