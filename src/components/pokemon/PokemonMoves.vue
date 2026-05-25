<template>
  <div>
    <div v-if="isMovesLoaded">
      <div class="generation">
        <BaseSelect
          :options="generationOptions"
          @change="changeGeneration"
        />
      </div>
      <PokemonMovesTable
        v-if="generations[selectedGeneration].levelUp.length > 0"
        :headers="tableHeaders"
        :items="generations[selectedGeneration].levelUp"
        :types="types"
        category="levelUp"
        title="level up"
      />
      <PokemonMovesTable
        v-if="generations[selectedGeneration].egg.length > 0"
        :headers="tableHeaders"
        :items="generations[selectedGeneration].egg"
        :types="types"
        category="egg"
        title="egg moves"
      />
      <PokemonMovesTable
        v-if="generations[selectedGeneration].machine.length > 0"
        :headers="tableHeaders"
        :items="generations[selectedGeneration].machine"
        :types="types"
        category="tm-hm"
        title="TM / HM"
      />
      <PokemonMovesTable
        v-if="generations[selectedGeneration].tutor.length > 0"
        :headers="tableHeaders"
        :items="generations[selectedGeneration].tutor"
        :types="types"
        category="tutor"
        title="learned by tutoring"
      />
    </div>
    <div
      v-else
      class="loading-moves"
    >
      <BaseProgressSpinner size="large" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRef } from "vue";
import { usePokemon, useMoveDetails } from "@/composables/usePokeApi";
import sortBy from "lodash.sortby";
import PokemonMovesTable from "@/components/pokemon/PokemonMovesTable.vue";
import BaseProgressSpinner from "@/components/base/BaseProgressSpinner.vue";
import BaseSelect, { optionsType } from "../base/BaseSelect.vue";

const VERSION_GROUP_GEN: Record<string, number> = {
  "red-blue": 1,
  "yellow": 1,
  "gold-silver": 2,
  "crystal": 2,
  "ruby-sapphire": 3,
  "emerald": 3,
  "firered-leafgreen": 3,
  "colosseum": 3,
  "xd": 3,
  "diamond-pearl": 4,
  "platinum": 4,
  "heartgold-soulsilver": 4,
  "black-white": 5,
  "black-2-white-2": 5,
  "x-y": 6,
  "omega-ruby-alpha-sapphire": 6,
  "sun-moon": 7,
  "ultra-sun-ultra-moon": 7,
};

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: { name: string };
  version_group: { name: string };
}

interface PokemonMoveRef {
  move: { name: string };
  version_group_details: VersionGroupDetail[];
}

interface MoveDetails {
  accuracy: number | null;
  damage_class?: { name: string };
  power: number | null;
  type?: { name: string };
}

interface MoveEntry {
  name: string;
  accuracy: number | null;
  category: string | undefined;
  power: number | null;
  type: string | undefined;
  level: number;
}

type GenMethod = "levelUp" | "egg" | "machine" | "tutor";

interface GenData {
  name: string;
  levelUp: MoveEntry[];
  egg: MoveEntry[];
  machine: MoveEntry[];
  tutor: MoveEntry[];
}

const METHOD_KEY: Record<string, GenMethod> = {
  "level-up": "levelUp",
  egg: "egg",
  machine: "machine",
  tutor: "tutor",
};

const TOTAL_GENS = 7;
const DEFAULT_GEN_INDEX = 6; // Gen 7 tab (0-based)

// --- helpers (pure, no reactivity) ---

function createEmptyGens(): GenData[] {
  return Array.from({ length: TOTAL_GENS }, (_, i) => ({
    name: `gen${i + 1}`,
    levelUp: [],
    egg: [],
    machine: [],
    tutor: [],
  }));
}

function buildMoveEntry(
  moveName: string,
  details: MoveDetails,
  level: number,
): MoveEntry {
  return {
    name: moveName,
    accuracy: details.accuracy,
    category: details.damage_class?.name,
    power: details.power,
    type: details.type?.name,
    level,
  };
}

function sortGenMoves(gen: GenData): void {
  gen.levelUp = sortBy(gen.levelUp, "level");
  gen.egg = sortBy(gen.egg, "name");
  gen.machine = sortBy(gen.machine, "name");
  gen.tutor = sortBy(gen.tutor, "name");
}

// --- component ---

const props = defineProps<{ pokemonId: number | string; types: string[] }>();

const pokemonId = toRef(props, "pokemonId");
const { data: pokemonData } = usePokemon(pokemonId);

const moveNames = computed<string[]>(() => [
  ...new Set<string>(
    (pokemonData.value?.moves ?? []).map((m: PokemonMoveRef) => m.move.name),
  ),
]);

const moveDetailQueries = useMoveDetails(moveNames);

const moveDetailsMap = computed<Record<string, MoveDetails>>(() => {
  const map: Record<string, MoveDetails> = {};
  moveDetailQueries.value.forEach((q) => {
    if (q.data) map[q.data.name] = q.data;
  });
  return map;
});

const isMovesLoaded = computed(
  () =>
    pokemonData.value != null &&
    moveDetailQueries.value.length > 0 &&
    moveDetailQueries.value.every((q) => q.isSuccess),
);

const generations = computed((): GenData[] => {
  if (!isMovesLoaded.value) return [];

  const gens = createEmptyGens();

  (pokemonData.value.moves as PokemonMoveRef[]).forEach(
    ({ move, version_group_details }) => {
      const details = moveDetailsMap.value[move.name];
      if (!details) return;

      const seen = new Set<string>();
      version_group_details.forEach(
        ({ level_learned_at, move_learn_method, version_group }) => {
          const genIndex = VERSION_GROUP_GEN[version_group.name];
          const method = METHOD_KEY[move_learn_method.name];
          if (!genIndex || !method) return;

          const key = `${genIndex}-${method}`;
          if (seen.has(key)) return;
          seen.add(key);

          gens[genIndex - 1][method].push(
            buildMoveEntry(move.name, details, level_learned_at),
          );
        },
      );
    },
  );

  gens.forEach(sortGenMoves);
  return gens;
});

const generationOptions = computed(() => {
  return Object.entries(VERSION_GROUP_GEN).map(([label, value]):optionsType => ({
    label,
    value: String(value)
  }));
});

const selectedGeneration = ref(DEFAULT_GEN_INDEX);

const tableHeaders = ["move", "type", "category", "power", "acc."];

function changeGeneration(value: string) {
  selectedGeneration.value = Number(value);
}
</script>

<style lang="scss" scoped>
.loading-moves {
  display: flex;
  justify-content: center;
  padding: $space-48 0;
}

.generation {
  align-items: center;
  display: flex;
  margin: $space-12 0 $space-16 $space-12;

  .tab-header {
    margin-left: $space-12;
    width: 100%;
    overflow-x: scroll;
  }
}
</style>
