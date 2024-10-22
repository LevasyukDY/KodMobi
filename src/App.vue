<script setup lang="ts">
import SelectCountry from "./components/SelectCountry.vue";
</script>

<template>
  <div
    class="w-[500px] h-[594px] rounded-[8px] border-[1px] pb-[24px] px-[30px]"
  >
    <div
      class="bg-gray-100 h-[40px] w-[300px] mx-auto mt-[50px] text-gray-400 flex items-center justify-center"
    >
      <p>Логотип (Высота 40px, длина до 300px)</p>
    </div>
    <h1 class="text-3xl font-medium text-black mt-[30px]">
      Введите номер телефона
    </h1>
    <p class="mt-[14px] text-[#666] font-normal text-base">
      Чтобы войти или зарегистрироваться
    </p>

    <SelectCountry class="mt-[30px]"></SelectCountry>
  </div>
</template>

<style scoped></style>
