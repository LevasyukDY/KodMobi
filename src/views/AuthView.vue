<script setup lang="ts">
import axios from "axios";
import InputText from "../components/InputText.vue";
import InputList from "../components/InputList.vue";
import { API_KEY } from "../config.ts";
import { onMounted, ref } from "vue";
import { ICountryCode, ICreateResponse } from "../types/types";

const emit = defineEmits(["nextStep", "data"]);

const countryPhoneCodeList = ref([]);
const country = ref<ICountryCode | null>(null);
const phone = ref<string | null>(null);
const required = true;
const pattern = "\\+\\d{1,4}\\s\\d{10}";

const continueAuth = async () => {
  if (!phone.value) throw new Error("phone.value = null");
  const data = JSON.stringify({
    to: phone.value.replaceAll(" ", ""),
    type: "telegram",
    send: false,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.kodmobi.aggone.net/v2/create",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": "en",
      "x-api-key": API_KEY,
    },
    data: data,
  };

  try {
    const response = await axios<ICreateResponse>(config);
    emit("nextStep", false);
    if (!country.value) throw new Error("phone.value = null");
    emit("data", {
      country: country.value.name,
      phone: phone.value,
      session_id: response.data.session_id,
    });
  } catch (e) {
    console.error(e);
  }
};

async function fetchCountryPhoneCodes() {
  try {
    const countryPhoneCodeResponse = await axios.get(
      "https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/2bc71083a77106afec2ec37cf49d05ee54be1a22/country_dial_info.json"
    );
    countryPhoneCodeList.value = countryPhoneCodeResponse.data.map(
      (val: ICountryCode) => {
        val["img"] =
          "https://flagcdn.com/16x12/" + val["code"].toLowerCase() + ".png";
        return val;
      }
    );
  } catch (e) {
    console.error(e);
  }
}

onMounted(async () => {
  await fetchCountryPhoneCodes();
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-medium text-black mt-[30px]">
      {{ $t("auth_view.enter_phone") }}
    </h1>
    <p class="mt-[14px] text-[#666] font-normal text-base">
      {{ $t("auth_view.enter_phone_description") }}
    </p>

    <form @submit.prevent="continueAuth">
      <InputList
        class="mt-[30px]"
        :data="countryPhoneCodeList"
        @update:value="(el) => (country = el)"
        :required
      >
        {{ $t("auth_view.country_input") }}
      </InputList>

      <InputText
        class="mt-[40px]"
        @update:value="(el) => (phone = el)"
        :required
        :pattern
        :code="country?.dial_code"
      >
        {{ $t("auth_view.phone_number_input") }}
      </InputText>

      <button
        class="mt-[50px] bg-[#007AFF] text-white h-[55px] w-full rounded hover:bg-[#3a99ff] transition-all font-medium"
        type="submit"
      >
        {{ $t("auth_view.continue") }}
      </button>
    </form>
  </div>
</template>
