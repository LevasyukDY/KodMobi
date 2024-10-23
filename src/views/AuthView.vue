<script setup>
import MyInput from "../components/MyInput.vue";
import router from "../router";

const continueAuth = () => {
  router.push("/verify");
};
</script>

<template>
  <h1 class="text-3xl font-medium text-black mt-[30px]">
    Введите номер телефона
  </h1>
  <p class="mt-[14px] text-[#666] font-normal text-base">
    Чтобы войти или зарегистрироваться
  </p>

  <MyInput class="mt-[30px]">Страна</MyInput>

  <MyInput class="mt-[40px]">Номер телефона</MyInput>

  <button
    class="mt-[50px] bg-blue-500 text-white h-[55px] w-full rounded-s hover:bg-blue-400 transition-all font-medium"
    @click="continueAuth"
  >
    Продолжить
  </button>
</template>
