<script setup lang="ts">
const emit = defineEmits(["isShowCodeSentView"]);
const props = defineProps(["data"]);

const goBack = () => {
  emit("isShowCodeSentView", false);
};
</script>

<template>
  <div
    class="absolute top-0 left-0 bg-white w-full h-full rounded-[8px] pb-[110px] px-[32px] pt-[50px] z-10"
  >
    <img
      class="w-[120px] h-[120px] mx-auto"
      :src="props.data?.channel?.image_url"
      alt=""
    />
    <h1 class="text-3xl font-medium text-black mt-[30px]">
      {{ props.data?.channel.name }}
    </h1>
    <p class="mt-[14px] text-[#666] font-normal text-base">
      {{ props.data?.channel?.description }}
    </p>
    <div class="flex flex-col">
      <a
        :href="props.data?.channel?.link"
        target="_blank"
        class="mt-[70px] py-[16px] bg-[#007AFF] text-white h-[55px] w-full text-center rounded hover:bg-[#3a99ff] transition-all font-medium"
      >
        {{ $t("code_sent_view.auth") }}
      </a>
      <button
        class="mt-[20px] text-[#007AFF] hover:text-[#3a99ff] transition-all font-medium"
      >
        {{ $t("code_sent_view.check_status") }}
      </button>
    </div>
    <img
      class="w-[24px] h-[24px] absolute left-[24px] top-[24px] cursor-pointer"
      src="../assets/arrow-back.svg"
      alt="Back"
      @click="goBack"
    />
  </div>
</template>
