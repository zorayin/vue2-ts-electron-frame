/*
 * @Author: your name
 * @Date: 2020-03-26 18:08:40
 * @LastEditTime: 2023-01-04 10:51:32
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\main.ts
 */
import Vue from "vue";
import "@/global";

import "./less/main.less";
import App from "./App.vue";
import router, { loadRouteHook } from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "./WebCompat";

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
