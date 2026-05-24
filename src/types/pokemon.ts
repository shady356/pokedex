import type { PokemonTypeName } from "@/helpers/types";

export interface PokemonTypeSlot {
  slot: number;
  type: { name: PokemonTypeName };
}

// Minimal entry used in the Pokédex list view
export interface PokemonListItem {
  id: number;
  name: string;
  types: PokemonTypeSlot[];
  sprite: string;
}

// Full data used in the Pokémon card / detail view
export interface PokemonCardData {
  id: number;
  name: string;
  sprite: string;
  types: PokemonTypeSlot[];
  abilities: Array<{
    ability: { name: string };
    is_hidden: boolean;
    slot: number;
  }>;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  height: number;
  weight: number;
}

export interface PokemonSpeciesData {
  eggGroups: Array<{ name: string }>;
  description: {
    flavor_text: string;
    version: { name: string };
  };
  captureRate: number;
  baseHappiness: number;
  growthRate: string;
  hatchCounter: number;
}
