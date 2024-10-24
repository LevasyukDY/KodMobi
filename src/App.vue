<script setup lang="ts">
import AuthView from "./views/AuthView.vue";
import VerifyView from "./views/VerifyView.vue";
import { ref } from "vue";
const isBeginOfAuth = ref(true);
const data = ref(null);
</script>

<template>
  <main>
    <div
      class="w-[500px] h-[594px] rounded-[8px] border-[1px] pb-[24px] px-[29px]"
    >
      <div
        class="bg-gray-100 h-[40px] w-[300px] mx-auto mt-[50px] text-gray-400 flex items-center justify-center"
      >
        <p>Логотип (Высота 40px, длина до 300px)</p>
      </div>

      <AuthView
        v-show="isBeginOfAuth"
        @nextStep="(el) => (isBeginOfAuth = el)"
        @data="(el) => (data = el)"
      />
      <VerifyView
        v-show="!isBeginOfAuth"
        @nextStep="(el) => (isBeginOfAuth = el)"
        :data="data"
      />

      <div class="mt-[70px] w-full flex justify-between items-center text-xs">
        <div class="flex gap-3 items-center cursor-pointer">
          <span class="">Русский</span>
          <img
            class="size-3"
            src="./assets/v-icon.svg"
          />
        </div>
        <div class="flex gap-6 items-center">
          <a href="">Условия</a>
          <a href="">Конфиденциальность</a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
