<script setup>
import { ref, reactive, onMounted } from "vue";
const { data, show } = defineProps(["data", "show"]);
const searchQuery = ref(null);
defineEmits(["update:value"]);
</script>

<template>
  <div
    v-show="show"
    class="km-scrollbar h-[319px] p-4 mt-1 w-full z-10 shadow-md shadow-gray-500 rounded bg-white absolute top-full left-0 overflow-y-auto"
  >
    <div class="relative mb-4">
      <img
        class="absolute top-1/2 -translate-y-1/2 left-3"
        src="../assets/search.svg"
        alt=""
      />
      <input
        class="bg-gray-100 w-full h-[38px] rounded-lg pl-9"
        placeholder="Поиск"
        type="text"
        v-model="searchQuery"
        @input="filterArray"
      />
    </div>
    <div
      class="w-full h-[48px] px-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-all rounded-lg"
      v-for="el in data"
      :key="el.code"
      @click="$emit('update:value', el)"
    >
      <div class="flex items-center gap-2">
        <img
          src="../assets/search.svg"
          alt=""
        />
        <span class="text-left">{{ el.name }}</span>
      </div>
      <span>{{ el.dial_code }}</span>
    </div>
  </div>
</template>
