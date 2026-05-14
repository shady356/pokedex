<template>
  <div>
    <div v-if="isMovesLoaded">
      <div class="generation">
        <h6>Generation:</h6>
        <BaseTab class="tab-header" :items="tabs" @changeTab="changeTab" />
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
    <div v-else class="loading-moves">
      <BaseProgressSpinner size="large" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, computed, type PropType } from "vue";
import { usePokemon, useMoveDetails } from "@/composables/usePokeApi";
import sortBy from "lodash.sortby";
import PokemonMovesTable from "@/components/pokemon/PokemonMovesTable.vue";
import BaseTab from "@/components/base/BaseTab.vue";
import BaseProgressSpinner from "@/components/base/BaseProgressSpinner.vue";

const VERSION_GROUP_GEN: Record<string, number> = {
  "red-blue": 1,
  yellow: 1,
  "gold-silver": 2,
  crystal: 2,
  "ruby-sapphire": 3,
  emerald: 3,
  "firered-leafgreen": 3,
  colosseum: 3,
  xd: 3,
  "diamond-pearl": 4,
  platinum: 4,
  "heartgold-soulsilver": 4,
  "black-white": 5,
  "black-2-white-2": 5,
  "x-y": 6,
  "omega-ruby-alpha-sapphire": 6,
  "sun-moon": 7,
  "ultra-sun-ultra-moon": 7,
};

const METHOD_KEY: Record<string, string> = {
  "level-up": "levelUp",
  egg: "egg",
  machine: "machine",
  tutor: "tutor",
};

interface GenData {
  name: string;
  levelUp: any[];
  egg: any[];
  machine: any[];
  tutor: any[];
}

export default defineComponent({
  name: "PokemonMoves",
  components: { PokemonMovesTable, BaseTab, BaseProgressSpinner },
  props: {
    pokemonId: {
      type: [Number, String] as PropType<number | string>,
      required: true,
    },
    types: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const pokemonId = toRef(props, "pokemonId");
    const { data: pokemonData } = usePokemon(pokemonId);

    const moveNames = computed<string[]>(() => [
      ...new Set<string>(
        (pokemonData.value?.moves ?? []).map((m: any) => m.move.name as string),
      ),
    ]);

    const moveDetailQueries = useMoveDetails(moveNames);

    const moveDetailsMap = computed<Record<string, any>>(() => {
      const map: Record<string, any> = {};
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

    const generations = computed(() => {
      if (!isMovesLoaded.value) return [];

      const gens: GenData[] = Array.from({ length: 7 }, (_, i) => ({
        name: "gen" + (i + 1),
        levelUp: [],
        egg: [],
        machine: [],
        tutor: [],
      }));

      pokemonData.value.moves.forEach(
        ({ move, version_group_details }: any) => {
          const details = moveDetailsMap.value[move.name];
          if (!details) return;

          const seen = new Set<string>();
          version_group_details.forEach(
            ({ level_learned_at, move_learn_method, version_group }: any) => {
              const gen = VERSION_GROUP_GEN[version_group.name];
              const method = METHOD_KEY[move_learn_method.name];
              if (!gen || !method) return;

              const key = `${gen}-${method}`;
              if (seen.has(key)) return;
              seen.add(key);
              (gens[gen - 1] as any)[method].push({
                name: move.name,
                accuracy: details.accuracy,
                category: details.damage_class?.name,
                power: details.power,
                type: details.type?.name,
                level: level_learned_at,
              });
            },
          );
        },
      );

      gens.forEach((gen) => {
        gen.levelUp = sortBy(gen.levelUp, "level");
        gen.egg = sortBy(gen.egg, "name");
        gen.machine = sortBy(gen.machine, "name");
        gen.tutor = sortBy(gen.tutor, "name");
      });

      return gens;
    });

    return { isMovesLoaded, generations };
  },
  data() {
    return {
      selectedGeneration: 6,
      tabs: [
        { name: "1", active: false },
        { name: "2", active: false },
        { name: "3", active: false },
        { name: "4", active: false },
        { name: "5", active: false },
        { name: "6", active: false },
        { name: "7", active: true },
      ],
      tableHeaders: ["move", "type", "category", "power", "acc."],
    };
  },
  watch: {
    pokemonId() {
      this.tabs.forEach((tab, i) => {
        tab.active = i === 6;
      });
      this.selectedGeneration = 6;
    },
  },
  methods: {
    changeTab(index: number) {
      this.tabs.forEach((tab) => {
        tab.active = false;
      });
      this.tabs[index].active = true;
      this.selectedGeneration = index;
    },
  },
});
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
