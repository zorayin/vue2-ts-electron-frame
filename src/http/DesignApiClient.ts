/*
 * @Author: 陈诗文
 * @Date: 2020-01-02 10:23:06
 * @LastEditTime: 2022-12-16 10:26:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\http\DesignApiClient.ts
 */
import BasicApiService from "./BasicApiService";
import { ModuleTypes } from "@/types/moduleTypes";
import store from "@/store";
import Vue from "vue";
import { CancelTokenSource } from "axios";

// const globalPath = (attr: string): string => `${ModuleTypes.GLOBAL_MODULE}/${attr}`;
const signalSourceGet = "screenSignalSourceGet";
const signalSourceUpdate = "screenSignalSourceUpdate";

class DesignApiClient extends BasicApiService {
  getGlobalCancelToken(key: string): CancelTokenSource {
    // 添加取消token,以防请求顺序错乱
    const tempMap = store.state[ModuleTypes.GLOBAL_MODULE]["cancelTokenMap"];
    let cancelToken = tempMap[key] as unknown as CancelTokenSource | null;
    cancelToken && cancelToken.cancel(key);
    cancelToken = this.httpClient.CancelToken.source();
    tempMap[key] = cancelToken;
    return tempMap[key];
  }
}

const apiService = new DesignApiClient();
export default apiService;
