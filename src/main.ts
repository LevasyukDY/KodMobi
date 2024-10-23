import { createApp } from "vue";
import router from "./router";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Material from "@primevue/themes/material";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Material,
  },
});
app.use(router);

app.mount("#app");
