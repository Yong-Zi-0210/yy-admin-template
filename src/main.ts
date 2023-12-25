import { createApp } from "vue";
import router from "@/router";
import "@/router/permission";
import store from "./store";
import App from "./App.vue";
import "./styles/index.scss";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import { loadSvg } from "@/icons";
import { loadPlugins } from "@/plugins";
const app = createApp(App);

/** 加载全局 SVG */
loadSvg(app);
// 注册插件
loadPlugins(app);

app.use(router);
app.use(store);
app.mount("#app");
