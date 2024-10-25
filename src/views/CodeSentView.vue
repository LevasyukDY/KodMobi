<script setup lang="ts">
import { ref } from "vue";
import { ISendResponse } from "../types/types.ts";

const emit = defineEmits(["isShowCodeSentView"]);
const props = defineProps<{ data: ISendResponse | null }>();

const isShowCheckBtn = ref(true);
let isCheckBtnWasClicked = false;

const goBack = () => {
  emit("isShowCodeSentView", false);
};

const checkStatus = async () => {
  isShowCheckBtn.value = false;
  await new Promise((resolve) => setTimeout(() => resolve(""), 5000));
  isShowCheckBtn.value = true;
  isCheckBtnWasClicked = true;
};
</script>

<template>
  <div
    class="absolute top-0 left-0 bg-white w-full h-full rounded-[8px] pb-[110px] px-[32px] pt-[50px] z-10"
  >
    <img
      class="w-[120px] h-[120px] mx-auto"
      :src="props.data?.channel.image_url"
    />
    <h1 class="text-3xl font-medium text-black mt-[30px]">
      {{ props.data?.channel.name }}
    </h1>
    <p
      v-if="!isCheckBtnWasClicked"
      class="mt-[14px] text-[#666] font-normal text-base"
    >
      {{ props.data?.channel.description }}
    </p>
    <p v-else class="mt-[14px] text-[#eb4036] font-normal text-base">
      {{ $t("code_sent_view.description_after_check") }}
    </p>
    <div class="flex flex-col">
      <a
        :href="props.data?.channel.link"
        target="_blank"
        class="mt-[70px] py-[16px] bg-[#007AFF] text-white h-[55px] w-full text-center rounded hover:bg-[#3a99ff] transition-all font-medium"
      >
        {{ $t("code_sent_view.auth") }}
      </a>
      <div class="mt-[20px]">
        <button
          class="text-[#007AFF] hover:text-[#3a99ff] transition-all font-medium"
          v-show="isShowCheckBtn"
          @click="checkStatus"
        >
          {{ $t("code_sent_view.check_status") }}
        </button>
        <div class="loader" v-show="!isShowCheckBtn"></div>
      </div>
    </div>
    <img
      class="w-[24px] h-[24px] absolute left-[24px] top-[24px] cursor-pointer"
      src="../assets/arrow-back.svg"
      alt="Back"
      @click="goBack"
    />
  </div>
</template>

<style scoped>
.loader {
  @apply w-6 h-6 rounded-[50%] mx-auto;
  aspect-ratio: 1;
  background: radial-gradient(farthest-side, #167bff 94%, #0000) top/4px 4px
      no-repeat,
    conic-gradient(#0000 50%, #167bff);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 4px), #000 0);
  animation: l13 1s infinite linear;
}
@keyframes l13 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
