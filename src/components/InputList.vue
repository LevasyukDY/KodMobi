<script setup lang="ts">
import InputText from "primevue/inputtext";
import InputMenu from "./InputMenu.vue";
import FloatLabel from "primevue/floatlabel";
import type { ICountryCode } from "../types/types";
import { ref } from "vue";

const { data, required } = defineProps(["data", "required"]);
const emit = defineEmits(["update:value"]);

const value = ref<string | null>(null);
const isShow = ref(false);

const updateCountryValue = (el: ICountryCode) => {
  value.value = el.name;
  isShow.value = false;
  emit("update:value", el);
};
</script>

<template>
  <div class="relative">
    <FloatLabel variant="on">
      <InputText
        v-model="value"
        @input="$emit('update:value', value)"
        @click="isShow = !isShow"
        :required
      />
      <label><slot></slot></label>
      <img
        class="absolute top-1/2 -translate-y-1/2 right-5 -z-10"
        src="../assets/arrow.svg"
        alt=""
      />
    </FloatLabel>
    <InputMenu
      :data="data"
      :show="isShow"
      @update:value="updateCountryValue"
    />
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
