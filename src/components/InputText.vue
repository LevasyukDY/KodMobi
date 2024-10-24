<script setup>
import { defineComponent, watch } from "vue";
import { ref } from "vue";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
const value = ref(null);
const { required, pattern, code } = defineProps([
  "required",
  "pattern",
  "code",
]);

watch(
  () => code,
  (code) => {
    value.value = code + " ";
  }
);
</script>

<template>
  <FloatLabel variant="on">
    <InputText
      v-model="value"
      @input="$emit('update:value', value)"
      :required
      :pattern
    />
    <label><slot></slot></label>
  </FloatLabel>
</template>

<style scoped>
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
