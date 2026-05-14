import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "material-icons/iconfont/material-icons.css";
import "material-icons/iconfont/round.css";

createApp(App).use(router).use(VueQueryPlugin).mount("#app");
