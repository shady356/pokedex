import { fetchGeneration, fetchType } from "@/service/pokeApi";

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
    const data = await fetchType(filters.types[0]);
    return data.pokemon
      .map((p: any) => toEntry(extractId(p.pokemon.url)))
      .sort((a: PokemonEntry, b: PokemonEntry) => a.id - b.id);
  }

  const data = await fetchGeneration("generation-i");
  return data.pokemon_species
    .map((s: any) => toEntry(extractId(s.url)))
    .sort((a: PokemonEntry, b: PokemonEntry) => a.id - b.id);
};
