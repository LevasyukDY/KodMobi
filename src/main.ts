import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import i18nOptions from "./i18n.json";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Material from "@primevue/themes/material";

const app = createApp(App);
export const i18n = createI18n(i18nOptions);

app.use(PrimeVue, {
  theme: {
    preset: Material,
  },
});

app.use(i18n);

app.mount("#app");
