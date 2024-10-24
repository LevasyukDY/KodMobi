<script setup>
import InputList from "../components/InputList.vue";
import InputText from "../components/InputText.vue";
const { data } = defineProps(["data"]);
const emit = defineEmits(["nextStep"]);

const goBack = () => {
  emit("nextStep", true);
};

const socialsList = [
  { name: "Telegram", code: 1, img: "telegram.svg" },
  { name: "WhatsApp", code: 2, img: "whatsapp.svg" },
  { name: "Viber", code: 3, img: "viber.svg" },
  { name: "SMS", code: 4, img: "sms.svg" },
];
</script>

<template>
  <div>
    <h1 class="text-3xl font-medium text-black mt-[30px]">Введите код</h1>
    <p class="mt-[14px] text-[#666] font-normal text-base">
      Отправлен по номеру {{ data?.phone }}
    </p>

    <InputList class="mt-[30px]" :data="socialsList">
      Способ получения кода
    </InputList>

    <InputText class="mt-[40px]">Введите код</InputText>

    <div class="mt-[50px] flex justify-between gap-5">
      <div class="h-[55px] w-full flex items-center justify-center gap-3">
        <img src="../assets/arrow-left.svg" alt="" />
        <button
          class="bg-transparent text-[#007AFF] hover:text-[#3a99ff] transition-all font-medium"
          @click="goBack"
        >
          Назад
        </button>
      </div>
      <button
        class="bg-[#007AFF] text-white h-[55px] w-full rounded hover:bg-[#3a99ff] transition-all font-medium"
      >
        Продолжить
      </button>
    </div>
  </div>
</template>
