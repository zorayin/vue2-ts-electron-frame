/*
 * @Author: 陈诗文
 * @Date: 2020-02-26 16:56:52
 * @LastEditTime: 2022-08-30 10:33:07
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\store\modules\viewstore\index.ts
 */
import { GetterTree, ActionTree, MutationTree } from "vuex";
import { make } from "vuex-pathify";
import apiService from "@/http/ViewApiClient";
import gloApiService from "@/http/GlobalApiClient";
import { ModuleTypes } from "@/types/moduleTypes";
import { RootState } from "@/store";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ViewState {}
const states: ViewState = {};
const getters: GetterTree<ViewState, RootState> = {};
const actions: ActionTree<ViewState, RootState> = {};

const mutations: MutationTree<ViewState> = {
  ...make.mutations(states)
};

export default {
  state: states,
  getters,
  actions,
  mutations,
  namespaced: true
};
