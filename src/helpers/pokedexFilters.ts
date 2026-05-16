import { fetchGeneration, fetchAllPokemonSpecies, fetchType } from "@/service/pokeApi";

export interface GenerationDef {
  name: string
  apiName: string
}

export interface PokemonEntry {
  id: number
  name: string
  types: Array<{ type: { name: string } }>
}

export interface Filters {
  generations: string[]
  types: string[]
}

export const GENERATIONS: GenerationDef[] = [
  { name: "kanto", apiName: "generation-i" },
  { name: "johto", apiName: "generation-ii" },
  { name: "hoenn", apiName: "generation-iii" },
  { name: "sinnoh", apiName: "generation-iv" },
  { name: "unova", apiName: "generation-v" },
  { name: "kalos", apiName: "generation-vi" },
  { name: "alola", apiName: "generation-vii" },
  { name: "galar", apiName: "generation-viii" },
];

const extractId = (url: string): number =>
  parseInt(url.split("/").filter(Boolean).pop()!, 10);

const toEntry = (id: number): PokemonEntry => ({
  id,
  name: "",
  types: [{ type: { name: "normal" } }],
});

export const $filterData = async (filters: Filters): Promise<PokemonEntry[]> => {
  if (filters.generations.length > 0) {
    const gen = GENERATIONS.find((g) => g.name === filters.generations[0]);
    if (gen) {
      const data = await fetchGeneration(gen.apiName);
      return data.pokemon_species
        .map((s: any) => toEntry(extractId(s.url)))
        .sort((a: PokemonEntry, b: PokemonEntry) => a.id - b.id);
    }
  }

  if (filters.types.length > 0) {
    const results = await Promise.all(filters.types.map((t) => fetchType(t)));
    const seen = new Set<number>();
    const entries: PokemonEntry[] = [];
    for (const data of results) {
      for (const p of data.pokemon) {
        const id = extractId(p.pokemon.url);
        if (!seen.has(id)) {
          seen.add(id);
          entries.push(toEntry(id));
        }
      }
    }
    return entries.sort((a, b) => a.id - b.id);
  }

  const data = await fetchAllPokemonSpecies();
  return data.results
    .map((s: any) => toEntry(extractId(s.url)))
    .sort((a: PokemonEntry, b: PokemonEntry) => a.id - b.id);
};
