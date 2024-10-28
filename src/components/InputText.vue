<script setup lang="ts">
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { watch } from "vue";
import { ref } from "vue";

const value = ref<string | null>(null);

const { required, pattern, code, invalid } = defineProps([
  "required",
  "pattern",
  "code",
  "invalid",
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
      :class="{ invalid }"
    />
    <label><slot></slot></label>
  </FloatLabel>
</template>

<style scoped>
.p-inputtext {
  @apply bg-transparent text-black w-full h-[55px] border-gray-300 outline-gray-300;
}
.p-floatlabel-on:has(input.p-filled) .p-inputtext:invalid {
  @apply border-[--danger-color] outline-[--danger-color] border-2 outline-2;
}
.p-inputtext:enabled:focus {
  @apply border-gray-400 outline-gray-400;
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
.p-floatlabel-on:has(input.p-filled) > .p-inputtext:invalid ~ label {
  @apply text-[--danger-color];
}

.p-floatlabel-on:has(input.p-filled) > .invalid {
  @apply border-[--danger-color] outline-[--danger-color] border-2 outline-2;
}
.p-floatlabel-on:has(input.p-filled) > .invalid ~ label {
  @apply text-[--danger-color];
}
</style>
