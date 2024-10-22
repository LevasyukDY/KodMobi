<script setup>
const isInputActive = ref(false);
</script>

<template>
  <div class="relative">
    <span
      class="absolute left-[18px] text-[24px] top-1/2 -translate-y-1/2 select-none -z-10 text-gray-400"
    >
      Страна
    </span>
    <input
      value=""
      class="w-full h-[55px] text-[24px] pl-4 border-[1px] rounded-s bg-transparent"
    />
    <button class="absolute top-1/2 right-[18px] -translate-y-1/2">
      <img src="../assets/arrow.svg" />
    </button>
  </div>
</template>
