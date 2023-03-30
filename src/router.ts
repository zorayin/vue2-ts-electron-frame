/*
 * @Author: 陈诗文
 * @Date: 2019-12-23 11:17:07
 * @LastEditTime: 2022-10-28 11:46:58
 * @LastEditors: chenshiwen 171287313@qq.com
 * @Description: 路由配置
 * @FilePath: \audio-vision-platform\src\router.ts
 */

import Vue from "vue";
import Router, { RouterOptions, RouteConfig, Route, RouteRecord, RouteMeta } from "vue-router";
type AsyncVue = () => Promise<unknown>;
const login: AsyncVue = () => import("./pages/Login.vue");
const home: AsyncVue = () => import("./pages/Home.vue");
import { ModuleTypes } from "@/types/moduleTypes";
import Store from "@/store";
import apiService from "@/http/GlobalApiClient";
import Dispatcher from "./utils/Dispatcher";
import { VueConstructor } from "vue/types/umd";

Vue.use(Router);
// 页面内部通知
const dispatch = new Dispatcher();

const router = new Router({
  routes: [
    {
      path: "",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/home",
      name: "首页",
      component: home,
      meta: { loginAuth: true }
    }
  ]
});

export function loadRouteHook(): void {
  if (!(window.Electron as unknown as boolean) || Vue.prototype.$loadMode === 1) {
    router.beforeEach(
      (
        to: Route,
        from: Route,
        next: (param?: { name?: string; query?: { redirect: string }; path?: string }) => void
      ) => {
        const verifyLogin = to.matched.some((element: RouteRecord) => {
          const meta = element.meta as RouteMeta | null;
          let tempLoginAuth = false;
          if (meta) {
            tempLoginAuth = meta.loginAuth;
          }
          return tempLoginAuth;
        });
        const token = SecureHelper.getToken();

        if (verifyLogin) {
          if (token) {
            next();
          } else {
            next({
              name: "login",
              query: { redirect: to.fullPath } //将跳转的路由path作为参数，登录成功后跳转到该路由
            });
          }
        } else if (token && (to.name === "login" || !to.name)) {
          //如果token未过期，那么地址栏为login 或者空时，不跳回登录页，而是跳到首页
          next({
            path: "/home"
          });
        } else {
          next();
        }
      }
    );
  }
}

export default router;
