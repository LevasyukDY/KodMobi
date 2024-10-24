<script setup>
import InputText from "../components/InputText.vue";
import InputList from "../components/InputList.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
const emit = defineEmits(["nextStep", "data"]);

const country = ref(null);
const phone = ref(null);
const required = true;
const pattern = "\\+\\d{1,3}\\s\\d{10}";

const continueAuth = () => {
  emit("nextStep", false);
  emit("data", { country: country.value.name, phone: phone.value });
};

const countryPhoneCodeList = ref([]);

async function fetchCountryPhoneCodes() {
  const countryPhoneCodeResponse = await axios.get(
    "https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/2bc71083a77106afec2ec37cf49d05ee54be1a22/country_dial_info.json"
  );
  countryPhoneCodeList.value = countryPhoneCodeResponse.data.map((val) => {
    val["img"] =
      "https://flagcdn.com/16x12/" + val["code"].toLowerCase() + ".png";
    return val;
  });
}

onMounted(async () => {
  await fetchCountryPhoneCodes();
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-medium text-black mt-[30px]">
      Введите номер телефона
    </h1>
    <p class="mt-[14px] text-[#666] font-normal text-base">
      Чтобы войти или зарегистрироваться
    </p>

    <form @submit.prevent="continueAuth">
      <InputList
        class="mt-[30px]"
        :data="countryPhoneCodeList"
        @update:value="(el) => (country = el)"
        :required
      >
        Страна
      </InputList>

      <InputText
        class="mt-[40px]"
        @update:value="(el) => (phone = el)"
        :required
        :pattern
        :code="country?.dial_code"
      >
        Номер телефона
      </InputText>

      <button
        class="mt-[50px] bg-[#007AFF] text-white h-[55px] w-full rounded hover:bg-[#3a99ff] transition-all font-medium"
        type="submit"
      >
        Продолжить
      </button>
    </form>
  </div>
</template>
