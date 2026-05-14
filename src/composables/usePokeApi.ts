import { computed, unref, ref, watch, type MaybeRef, type Ref } from "vue";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/vue-query";
import {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchMove,
  fetchAbility,
} from "@/service/pokeApi";

export { useQueryClient };

export const STALE = Infinity;

export const usePokemon = (id: MaybeRef<number | string>) =>
  useQuery({
    queryKey: computed(() => ["pokemon", unref(id)]),
    queryFn: () => fetchPokemon(unref(id)),
    staleTime: STALE,
    enabled: computed(() => !!unref(id)),
    placeholderData: keepPreviousData,
  });

export const usePokemonSpecies = (id: MaybeRef<number | string>) =>
  useQuery({
    queryKey: computed(() => ["pokemon-species", unref(id)]),
    queryFn: () => fetchPokemonSpecies(unref(id)),
    staleTime: STALE,
    enabled: computed(() => !!unref(id)),
    placeholderData: keepPreviousData,
  });

export const useAbility = (name: MaybeRef<string>) =>
  useQuery({
    queryKey: computed(() => ["ability", unref(name)]),
    queryFn: () => fetchAbility(unref(name)),
    staleTime: STALE,
    enabled: computed(() => !!unref(name)),
  });

export const useMoveDetails = (moveNames: Ref<string[]>) => {
  const queryClient = useQueryClient();
  const results = ref<Array<{ data: any; isSuccess: boolean }>>([]);

  watch(
    moveNames,
    async (names) => {
      results.value = [];
      if (!names.length) return;
      const data = await Promise.all(
        names.map((name) =>
          queryClient.fetchQuery({
            queryKey: ["move", name],
            queryFn: () => fetchMove(name),
            staleTime: STALE,
          }),
        ),
      );
      results.value = data.map((d) => ({ data: d, isSuccess: true }));
    },
    { immediate: true },
  );

  return results;
};
