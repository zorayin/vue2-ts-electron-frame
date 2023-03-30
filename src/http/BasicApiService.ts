import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import moment from "moment";
import URLConfig from "@/utils/UrlConfig";
import { StateCode } from "@/utils/StateCodeConstants";
import { Message } from "element-ui";
// import Vue from "*.vue";
import Router from "@/router";
import Vue from "vue";
// import { IResult } from '@src/electron/api/service/PageService';

const iMessage = Message;
//请求拦截携带token
axios.interceptors.request.use(
  (config) => {
    if (Vue.prototype.$loadMode === 0 && Vue.prototype.$electronEnv === true) {
      return Promise.reject(config);
      // return config;
    }
    const token = SecureHelper.getToken();
    if (token && !config.headers.token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface CustomConfig {
  autoHint: boolean;
  onlyHintFail: boolean;
  isNodeBox: boolean;
}

// const dateFormatString = "YYYY-MM-DD HH:mm:00";
export default class BasicApiService {
  readonly httpClient = axios;
  readonly format = moment;
  readonly urlConfig = URLConfig;
  readonly qs = qs;
  readonly stateCode = StateCode;
  protected readonly defaultConfig = this.getCustomConfig();
  protected onlyErrorConfig = this.getCustomConfig();
  // 分布式节点盒子的请求
  protected nodeBoxConfig = this.getCustomConfig();

  constructor() {
    this.onlyErrorConfig["onlyHintFail"] = true;
    this.nodeBoxConfig["isNodeBox"] = true;
  }

  getCustomConfig(): CustomConfig {
    return {
      autoHint: true,
      onlyHintFail: false,
      isNodeBox: false
    };
  }

  getOnlyErrorConfig(): CustomConfig {
    return this.onlyErrorConfig;
  }

  private extraOperate<T>(result?: AxiosResponse<T>, customConfig?: CustomConfig | null): T {
    // 分布式节点盒子的请求回复处理
    if (result && customConfig && customConfig.isNodeBox) {
      return result.data;
    }

    const lastResult = false as unknown as T;
    //当前请求已被cancel掉
    if (result === undefined) return lastResult;

    const realResult = result.data;

    if (realResult) {
      if (customConfig !== null && customConfig !== undefined && customConfig.autoHint) {
        if ((realResult as unknown as GlobalBean.ResParams<unknown>).type === StateCode.SUCCESS) {
          if (!customConfig.onlyHintFail) {
            const hintText = (realResult as unknown as GlobalBean.ResParams<unknown>).message
              ? (realResult as unknown as GlobalBean.ResParams<unknown>).message
              : "执行成功！";
            if (
              (realResult as unknown as GlobalBean.ResParams<unknown>).message !== null &&
              (realResult as unknown as GlobalBean.ResParams<unknown>).message !== "没有查询到数据"
            ) {
              iMessage.success(hintText as unknown as string);
            }
          }
        } else {
          if (
            (realResult as unknown as GlobalBean.ResParams<unknown>).type !== StateCode.EMPTY &&
            (realResult as unknown as GlobalBean.ResParams<unknown>).message !== null
          ) {
            iMessage.warning(
              (realResult as unknown as GlobalBean.ResParams<unknown>).message as unknown as string
            );
          }
        }
      }
    }

    // lastResult = realResult ? realResult : true;
    this.printLog(realResult);
    return realResult;
  }

  private operateError<T>(result?: AxiosResponse<T> | null, customConfig?: CustomConfig | null): T {
    // 分布式节点盒子的请求回复处理
    if (result && customConfig && customConfig.isNodeBox) {
      return result.data;
    }
    const lastResult = false as unknown as T;
    // 当前请求已被cancel掉
    if (result === undefined || result === null) return lastResult;
    if (Vue.prototype.$loadMode !== 0) {
      const paramFailCode = 400;
      const serverFailCode = 500;
      const realResult = result.data as unknown as GlobalBean.ResParams<T>;

      const { status } = result;
      const hintText = realResult.message;
      if (customConfig !== null && customConfig && customConfig.autoHint) {
        if (status >= paramFailCode && status < serverFailCode) {
          if (
            realResult.message !== null &&
            realResult.message !== "没有查询到数据" &&
            realResult.message !== "未查询到数据" &&
            hintText !== null
          ) {
            iMessage.warning(hintText);
          }
        } else {
          iMessage.error("网络异常/服务器繁忙");
        }
      }
      if (realResult.type === "TOKEN.INVALID") {
        localStorage.removeItem("token");
        Router.push({
          name: "login",
          query: { redirect: Router.currentRoute.fullPath }
        });
      }
    }
    // this.printLog(realResult);
    return lastResult;
  }

  protected async get<T>(
    url: string,
    customConfig?: CustomConfig,
    httpConfig?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const result = await this.httpClient.get(url, httpConfig);
      return this.extraOperate(result, customConfig);
    } catch (e) {
      return this.operateError((e as AxiosError<T>).response, customConfig);
    }
  }

  protected async getFormat<T>(
    url: string,
    param?: Record<string, unknown>,
    customConfig?: CustomConfig,
    httpConfig?: AxiosRequestConfig
  ): Promise<T> {
    let tempUrl = url;
    if (param) {
      tempUrl = `${url}?${GlobalUtils.serialRequestParam(param)}`;
    }

    try {
      const result = await this.httpClient.get(tempUrl, httpConfig);
      return this.extraOperate(result, customConfig);
    } catch (e) {
      if (e && (e as AxiosError<T>).response) {
        return this.operateError((e as AxiosError<T>).response, customConfig);
      }
      return this.operateError(null, customConfig);
    }
  }

  protected async getFormatCustom<T>(
    url: string,
    param?: unknown,
    customConfig?: CustomConfig,
    httpConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const result = await axios.get(url);
    return result;
  }

  protected async postRawJSON<T>(
    url: string,
    param?: unknown,
    customConfig?: CustomConfig,
    httpConfig?: AxiosRequestConfig
  ): Promise<T> {
    const tempHeader = { headers: { "content-type": "application/json" }, ...httpConfig };
    try {
      const result = await this.httpClient.post(url, param, tempHeader);
      return this.extraOperate(result, customConfig);
    } catch (e) {
      // console.log(e)
      return this.operateError((e as AxiosError<T>).response, customConfig);
    }
  }
  //ForamData传参数
  protected async postFormData<T>(
    url: string,
    param?: unknown,
    customConfig?: CustomConfig,
    httpConfig?: AxiosRequestConfig
  ): Promise<T> {
    const tempHeader = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      ...httpConfig
    };
    const strParam = qs.stringify(param);
    try {
      const result = await this.httpClient.post(url, strParam, tempHeader);
      return this.extraOperate(result, customConfig);
    } catch (e) {
      return this.operateError((e as AxiosError<T>).response, customConfig);
    }
  }

  protected async postRawJSONstreamDevice<T>(
    url: string,
    param?: unknown,
    customConfig?: CustomConfig,
    httpConfig?: AxiosRequestConfig
  ): Promise<T> {
    const tempHeader = { headers: { "content-type": "application/json" }, ...httpConfig };
    try {
      const result = await this.httpClient.post(url, param, tempHeader);
      return this.extraOperate(result, customConfig);
    } catch (e) {
      // console.log(e)
      return this.operateError((e as AxiosError<T>).response, customConfig);
    }
  }

  protected async put<T>(
    url: string,
    param?: unknown,
    customConfig?: CustomConfig,
    httpConfig?: AxiosRequestConfig
  ): Promise<T> {
    const tempHeader = { headers: { "content-type": "application/json" }, ...httpConfig };
    try {
      const result = await this.httpClient.put(url, param, tempHeader);
      return this.extraOperate(result, customConfig);
    } catch (e) {
      return this.operateError((e as AxiosError<T>).response, customConfig);
    }
  }

  protected async delete<T>(
    url: string,
    customConfig?: CustomConfig,
    httpConfig?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const result = await this.httpClient.delete(url);
      return this.extraOperate(result, customConfig);
    } catch (e) {
      return this.operateError((e as AxiosError<T>).response, customConfig);
    }
  }

  protected async deleteFormat<T>(
    url: string,
    param?: Record<string, string | number | string[]>,
    customConfig?: CustomConfig,
    httpConfig?: AxiosRequestConfig
  ): Promise<T> {
    let tempUrl = url;
    if (param) {
      tempUrl = `${url}?${GlobalUtils.serialRequestParam(param)}`;
    }
    try {
      const result = await this.httpClient.delete(tempUrl);
      return this.extraOperate(result, customConfig);
    } catch (e) {
      return this.operateError((e as AxiosError<T>).response, customConfig);
    }
  }

  protected async post<T>(
    url: string,
    param?: FormData | null | Record<string, unknown> | string,
    customConfig?: CustomConfig,
    httpConfig?: AxiosRequestConfig
  ): Promise<T> {
    let tempParam = param;
    if (param !== null && !(param instanceof FormData)) {
      tempParam = this.qs.stringify(param);
    }
    try {
      const result = await this.httpClient.post(url, tempParam, httpConfig);
      return this.extraOperate(result, customConfig);
    } catch (e) {
      return this.operateError((e as AxiosError<T>).response, customConfig);
    }
  }

  protected async upload<T>(
    url: string,
    param?: Record<string, string> | null | FormData,
    customConfig?: CustomConfig,
    httpConfig?: AxiosRequestConfig
  ): Promise<T> {
    const tempHeader = { headers: { "Content-Type": "multipart/form-data" }, ...httpConfig };
    let tempParam = param;
    if (param !== null && !(param instanceof FormData)) {
      tempParam = new FormData();
      for (const key in param) {
        tempParam.append(key, param[key]);
      }
    }
    try {
      const result = await this.httpClient.post(url, tempParam, tempHeader);
      return this.extraOperate(result, customConfig);
    } catch (e) {
      return this.operateError((e as AxiosError<T>).response, customConfig);
    }
  }

  protected printLog(result: unknown): void {
    if (process.env.NODE_ENV === "development") {
      //console
    }
  }
}
