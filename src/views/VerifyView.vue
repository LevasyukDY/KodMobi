<script setup lang="ts">
import axios from "axios";
import InputList from "../components/InputList.vue";
import InputText from "../components/InputText.vue";
import { ref } from "vue";
import { API_KEY } from "../config";
import type {
  ICheckResponse,
  ISendResponse,
  ISocials,
} from "../types/types.ts";

const props = defineProps(["data"]);
const emit = defineEmits(["nextStep", "socialsData", "isShowCodeSentView"]);

const social = ref<ISocials | null>(null);
const code = ref<number | null>(null);
const timer = ref("0:30");
const isShowTimer = ref(false);
const isInvalidCode = ref(false);
const required = true;
const pattern = "\\d{4}";

const goBack = () => {
  emit("nextStep", true);
};

const socialsList = [
  { name: "Telegram", code: 1, img: "telegram.svg" },
  { name: "WhatsApp", code: 2, img: "whatsapp.svg" },
  { name: "Viber", code: 3, img: "viber.svg" },
  { name: "SMS", code: 4, img: "sms.svg" },
];

const sendCode = async () => {
  if (!social.value) throw new Error("social.value равен null или undefined");
  if (social && social.value?.code > 0) {
    let i = 30;
    isShowTimer.value = true;

    const data = JSON.stringify({
      session_id: props.data?.session_id,
      type: social.value.name.toLowerCase(),
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.kodmobi.aggone.net/v2/send",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage.getItem("i18n") || "ru",
        "x-api-key": API_KEY,
      },
      data: data,
    };

    try {
      const response = await axios<ISendResponse>(config);
      emit("socialsData", response.data);
      emit("isShowCodeSentView", true);
    } catch (e) {
      console.error(e);
    }

    await new Promise((resolve, _) => {
      let intervalId = setInterval(() => {
        if (i < 10) timer.value = "0:0" + i;
        else if (i < 60) timer.value = "0:" + i;
        i--;
        if (i === 0) {
          clearInterval(intervalId);
          resolve("");
        }
      }, 1000);
    });
    isShowTimer.value = false;
  }
};

const goNext = async () => {
  const data = JSON.stringify({
    session_id: props.data?.session_id,
    code: code.value,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.kodmobi.aggone.net/v2/check",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": localStorage.getItem("i18n") || "ru",
      "x-api-key": API_KEY,
    },
    data: data,
  };

  try {
    const response = await axios<ICheckResponse>(config);
    console.log(response.data);
    alert(JSON.stringify(response.data, null, 2));
  } catch (e) {
    console.error(e);
    isInvalidCode.value = true;
  }
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-medium text-black mt-[30px]">
      {{ $t("verify_view.enter_code") }}
    </h1>
    <p class="mt-[14px] text-[--secondary-text-color] font-normal text-base">
      {{ $t("verify_view.enter_code_description") }} {{ props.data?.phone }}
    </p>

    <form @submit.prevent="goNext">
      <InputList
        class="mt-[30px]"
        :data="socialsList"
        @update:value="(el) => (social = el)"
        :required
      >
        {{ $t("verify_view.socials_input") }}
      </InputList>

      <div class="relative">
        <InputText
          class="mt-[40px]"
          @update:value="(el) => (code = el)"
          :pattern="pattern"
          :required
          :invalid="isInvalidCode"
        >
          {{ $t("verify_view.enter_code") }}
        </InputText>

        <p
          class="input_text-field_message absolute left-0 -bottom-[20px] ml-4 mt-1 text-[--danger-color] font-normal text-xs text-left"
          v-if="isInvalidCode"
        >
          {{ $t("verify_view.invalid_code") }}
        </p>

        <div class="absolute top-1/2 -translate-y-1/2 right-5">
          <button
            class="text-[--primary-color] hover:text-[--primary-color-hover] transition-all font-medium"
            @click="sendCode"
            v-if="!isShowTimer"
          >
            {{ $t("verify_view.send_btn") }}
          </button>
          <span
            v-else
            class="text-gray-400"
          >
            {{ timer }}
          </span>
        </div>
      </div>

      <div class="mt-[50px] flex justify-between gap-5">
        <div class="h-[55px] w-full flex items-center justify-center gap-3">
          <img src="../assets/arrow-left.svg" />
          <button
            class="bg-transparent text-[--primary-color] hover:text-[--primary-color-hover] transition-all font-medium"
            @click="goBack"
          >
            {{ $t("verify_view.btn_back") }}
          </button>
        </div>
        <button
          class="bg-[--primary-color] text-white h-[55px] w-full rounded hover:bg-[--primary-color-hover] transition-all font-medium"
          type="submit"
        >
          {{ $t("verify_view.btn_next") }}
        </button>
      </div>
    </form>
  </div>
</template>
