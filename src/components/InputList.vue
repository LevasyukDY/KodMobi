<script setup>
import { defineComponent, onMounted, toRef, watch } from "vue";
import { ref } from "vue";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";

const { data } = defineProps(["data"]);
const value = ref(null);
</script>

<template>
  <div class="relative">
    <FloatLabel variant="on">
      <InputText id="on_label" v-model="value" />
      <label for="on_label"><slot></slot></label>
      <img
        class="absolute top-1/2 -translate-y-1/2 right-5"
        src="../assets/arrow.svg"
        alt=""
      />
    </FloatLabel>
    <div
      v-show="!!value"
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
        />
      </div>
      <div
        class="w-full h-[48px] px-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-all rounded-lg"
        v-for="el in data"
        :key="el.code"
      >
        <span>{{ el.name }}</span>
        <span>{{ el.dial_code }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.km-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #acacac #e0e0e0;
  scrollbar-gutter: stable;
}
.p-inputtext {
  @apply bg-transparent text-black w-full h-[55px] border-gray-300 outline-gray-300;
}
.p-floatlabel label {
  @apply font-normal;
}
.p-floatlabel-on:has(input:focus) label {
  @apply bg-white text-[var(--p-floatlabel-color)] font-normal;
}
.p-floatlabel-on:has(input.p-filled) label {
  @apply bg-white;
}
.p-inputtext:enabled:focus {
  @apply border-gray-400 outline-gray-400;
}
</style>
