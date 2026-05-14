import { fetchGeneration, fetchType } from "@/service/pokeApi.js";

export const GENERATIONS = [
  { name: "kanto", apiName: "generation-i" },
  { name: "johto", apiName: "generation-ii" },
  { name: "hoenn", apiName: "generation-iii" },
  { name: "sinnoh", apiName: "generation-iv" },
  { name: "unova", apiName: "generation-v" },
  { name: "kalos", apiName: "generation-vi" },
  { name: "alola", apiName: "generation-vii" },
  { name: "galar", apiName: "generation-viii" },
];

const extractId = (url) => parseInt(url.split("/").filter(Boolean).pop());

const toEntry = (id) => ({
  id,
  name: "",
  types: [{ type: { name: "normal" } }],
});

export const $filterData = async (filters) => {
  if (filters.generations.length > 0) {
    const gen = GENERATIONS.find((g) => g.name === filters.generations[0]);
    if (gen) {
      const data = await fetchGeneration(gen.apiName);
      return data.pokemon_species
        .map((s) => toEntry(extractId(s.url)))
        .sort((a, b) => a.id - b.id);
    }
  }

  if (filters.types.length > 0) {
    const data = await fetchType(filters.types[0]);
    return data.pokemon
      .map((p) => toEntry(extractId(p.pokemon.url)))
      .sort((a, b) => a.id - b.id);
  }

  const data = await fetchGeneration("generation-i");
  return data.pokemon_species
    .map((s) => toEntry(extractId(s.url)))
    .sort((a, b) => a.id - b.id);
};
