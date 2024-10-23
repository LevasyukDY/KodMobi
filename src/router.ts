import { createWebHistory, createRouter } from "vue-router";
import AuthView from "./views/AuthView.vue";
import VerifyView from "./views/VerifyView.vue";

const routes = [
  { path: "/", component: AuthView },
  { path: "/verify", component: VerifyView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
