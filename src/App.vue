<script setup lang="ts">
import AuthView from "./views/AuthView.vue";
import VerifyView from "./views/VerifyView.vue";
import CodeSentView from "./views/CodeSentView.vue";
import { onMounted, ref } from "vue";
import { i18n } from "./main";

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
        class="h-[40px] w-[300px] mx-auto mt-[50px] bg-[#f8f8f8] text-gray-400 text-sm flex items-center justify-center"
      >
        <p>{{ $t("app.logo") }}</p>
      </div>

      <AuthView
        v-if="isBeginOfAuth"
        @nextStep="(el) => (isBeginOfAuth = el)"
        @data="(el) => (data = el)"
      />
      <VerifyView
        v-else
        @nextStep="(el) => (isBeginOfAuth = el)"
        @socialsData="(el) => (socialsData = el)"
        @isShowCodeSentView="(el) => (isShowCodeSentView = el)"
        :data="data"
      />
      <CodeSentView
        v-if="isShowCodeSentView"
        :data="socialsData"
        @isShowCodeSentView="(el) => (isShowCodeSentView = el)"
      />

      <div
        class="mt-[70px] w-full flex justify-between items-center text-xs text-[--secondary-text-color]"
      >
        <div class="flex gap-1 items-center relative">
          <button
            @click="showLanguageMenu"
            class="cursor-pointer"
          >
            {{ $t("app.language") }}
          </button>
          <img
            class="size-3 cursor-pointer"
            @click="showLanguageMenu"
            src="./assets/v-icon.svg"
          />
          <div
            v-if="isShowLanguageMenu"
            class="bg-white w-full h-10 absolute left-0 top-5 shadow-md shadow-gray-400 rounded p-1 z-10"
          >
            <button
              class="hover:bg-gray-100 transition-all cursor-pointer"
              @click="() => changeLang('ru')"
            >
              Русский
            </button>
            <button
              class="hover:bg-gray-100 transition-all cursor-pointer"
              @click="() => changeLang('en')"
            >
              English
            </button>
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
