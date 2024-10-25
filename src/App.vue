<script setup lang="ts">
import AuthView from "./views/AuthView.vue";
import VerifyView from "./views/VerifyView.vue";
import CodeSentView from "./views/CodeSentView.vue";
import { onMounted, ref } from "vue";
import { i18n } from "./main.ts";

const isBeginOfAuth = ref(true);
const data = ref(null);
const socialsData = ref(null);
const isShowLanguageMenu = ref(false);
const isShowCodeSentView = ref(false);

const showLanguageMenu = () => {
  isShowLanguageMenu.value = !isShowLanguageMenu.value;
};

const changeLang = (value: "ru" | "en") => {
  i18n.global.locale = value;
  localStorage.setItem("i18n", value);
  showLanguageMenu();
};

onMounted(() => {
  const locale = localStorage.getItem("i18n");
  if ((locale && locale === "ru") || locale === "en")
    i18n.global.locale = locale;
});
</script>

<template>
  <main>
    <div
      class="relative w-[500px] h-[594px] rounded-[8px] border-[1px] pb-[24px] px-[29px]"
    >
      <div
        class="h-[40px] w-[300px] mx-auto mt-[50px] text-gray-400 flex items-center justify-center"
      >
        <!-- <p>{{ $t("app.logo") }}</p> -->
        <img src="./assets/logo.svg" class="h-full" alt="" />
      </div>

      <AuthView
        v-show="isBeginOfAuth"
        @nextStep="(el) => (isBeginOfAuth = el)"
        @data="(el) => (data = el)"
      />
      <VerifyView
        v-show="!isBeginOfAuth"
        @nextStep="(el) => (isBeginOfAuth = el)"
        @socialsData="(el) => (socialsData = el)"
        @isShowCodeSentView="(el) => (isShowCodeSentView = el)"
        :data="data"
      />
      <CodeSentView
        v-show="isShowCodeSentView"
        :data="socialsData"
        @isShowCodeSentView="(el) => (isShowCodeSentView = el)"
      />

      <div class="mt-[70px] w-full flex justify-between items-center text-xs">
        <div class="flex gap-1 items-center relative">
          <span @click="showLanguageMenu" class="cursor-pointer">{{
            $t("app.language")
          }}</span>
          <img
            class="size-3 cursor-pointer"
            @click="showLanguageMenu"
            src="./assets/v-icon.svg"
          />
          <div
            v-show="isShowLanguageMenu"
            class="bg-white w-full h-10 absolute left-0 top-5 shadow-md shadow-gray-400 rounded p-1 z-10"
          >
            <div
              class="hover:bg-gray-100 transition-all cursor-pointer"
              @click="() => changeLang('ru')"
            >
              Русский
            </div>
            <div
              class="hover:bg-gray-100 transition-all cursor-pointer"
              @click="() => changeLang('en')"
            >
              English
            </div>
          </div>
        </div>
        <div class="flex gap-6 items-center">
          <a href="">{{ $t("app.conditions") }}</a>
          <a href="">{{ $t("app.confidentiality") }}</a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
