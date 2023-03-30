/*
 * @Author: 陈诗文
 * @Date: 2019-12-23 11:17:09
 * @LastEditTime: 2021-02-05 11:19:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\store\modules\globalstore\index.ts
 */
import { GetterTree, ActionTree, MutationTree } from "vuex";
import { make } from "vuex-pathify";
import { CancelTokenSource } from "axios";

export interface GlobalState {
  // 全局axios CancelToken映射
  cancelTokenMap: Record<string, CancelTokenSource>;
}
const state: GlobalState = {
  cancelTokenMap: {}
};

const getters: GetterTree<GlobalState, unknown> = {};

const actions: ActionTree<GlobalState, unknown> = {};

const mutations: MutationTree<GlobalState> = {
  ...make.mutations(state)
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
