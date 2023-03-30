/*
 * @Author: 陈诗文
 * @Date: 2019-12-23 11:17:07
 * @LastEditTime: 2020-02-26 17:07:24
 * @LastEditors: 陈诗文
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\store.ts
 */
import Vue from "vue";
import Vuex from "vuex";
import pathify from "vuex-pathify";
import { ModuleTypes } from "@/types/moduleTypes";
import GlobalStore, { GlobalState } from "./store/modules/globalstore";
import ViewStore, { ViewState } from "./store/modules/viewstore";

export interface RootState {
  global: GlobalState;
  viewModule: ViewState;
}

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  plugins: [pathify.plugin],
  modules: {
    [ModuleTypes.GLOBAL_MODULE]: GlobalStore,
    [ModuleTypes.VIEW_MODULE]: ViewStore
  }
});
