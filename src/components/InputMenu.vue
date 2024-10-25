<script setup lang="ts">
import { ref, computed } from "vue";
import { TCountryCodes } from "../types/types";

const { data, show } = defineProps<{ data: TCountryCodes; show: boolean }>();
defineEmits(["update:value"]);

const searchQuery = ref<string | null>(null);

const filteredArray = computed<TCountryCodes>(() => {
  if (searchQuery.value && searchQuery.value.length > 0)
    return data.filter(({ name }) =>
      [name].some((val) => {
        if (searchQuery.value)
          return val.toLowerCase().includes(searchQuery.value.toLowerCase());
      })
    );
  else {
    return data;
  }
});
</script>

<template>
  <div
    v-show="show"
    class="km-scrollbar max-h-[319px] p-4 mt-1 w-full z-10 shadow-md shadow-gray-500 rounded bg-white absolute top-full left-0 overflow-y-auto"
  >
    <div class="relative mb-4">
      <img
        class="absolute top-1/2 -translate-y-1/2 left-3"
        src="../assets/search.svg"
      />
      <input
        class="bg-gray-100 w-full h-[38px] rounded-lg pl-9"
        :placeholder="$t('input_menu.search_placeholder')"
        type="text"
        v-model="searchQuery"
      />
      <img
        v-show="searchQuery && searchQuery.length > 0"
        class="absolute w-4 h-4 top-1/2 -translate-y-1/2 right-3"
        src="../assets/clear.svg"
        @click="searchQuery = ''"
      />
    </div>
    <span class="text-gray-400" v-show="filteredArray.length === 0">{{
      $t("input_menu.nothing_found")
    }}</span>

    <button
      class="w-full h-[48px] px-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-all rounded-lg"
      v-for="el in filteredArray"
      :key="el.code"
      @click="$emit('update:value', el)"
    >
      <div class="flex items-center gap-2">
        <img :src="el.img" alt="" />
        <span class="text-left">{{ el.name }}</span>
      </div>
      <span class="font-bold">{{ el.dial_code }}</span>
    </button>
  </div>
</template>
