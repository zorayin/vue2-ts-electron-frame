/*
 * @Author: chenshiwen 171287313@qq.com
 * @Date: 2022-06-06 14:05:28
 * @LastEditors: chenshiwen 171287313@qq.com
 * @LastEditTime: 2022-06-08 13:53:57
 * @FilePath: \audio-vision-platform\src\utils\NetworkUtils.ts
 * @Description: 网络状态工具类
 */

import Dispatcher from "./Dispatcher";

export interface NetworkState {
  online: boolean;
}

class NetworkUtils {
  private static proxyObj: NetworkUtils;
  private readonly NETWORK_TYPE = "network-state" as const;
  // 当浏览器不支持监听网络状态api时
  private loopNetStateCode = -1;
  // 默认8秒
  private loopNetStateTime = 8;
  private lastNetworkState = false;
  private dispatch: Dispatcher = new Dispatcher();

  static getInstance(): NetworkUtils {
    if (!(this.proxyObj as NetworkUtils | null)) {
      this.proxyObj = new NetworkUtils();
    }
    return this.proxyObj;
  }
  private constructor() {
    this.initNetworkListener();
  }

  getNetworkState(): NetworkState {
    return this.createNetworkState(this.lastNetworkState);
  }

  createNetworkState(online: boolean): NetworkState {
    return {
      online
    };
  }

  initNetworkListener(): void {
    this.lastNetworkState = navigator.onLine;
    const bodyProxy = document.body as unknown as { ononline: (() => void) | null };
    if (bodyProxy.ononline) {
      bodyProxy.ononline = () => {
        console.log("网络已经连上");
        this.dispatch.fire(this.NETWORK_TYPE, this.createNetworkState(true));
      };
      bodyProxy.ononline = () => {
        console.log("网络已经断开");
        this.dispatch.fire(this.NETWORK_TYPE, this.createNetworkState(false));
      };
    } else {
      this.loopNetStateCode = window.setInterval(() => {
        if (this.lastNetworkState === navigator.onLine) return;
        this.lastNetworkState = navigator.onLine;

        const hintText = this.lastNetworkState ? "网络已经连上" : "网络已经断开";
        console.log(hintText);
        this.dispatch.fire(this.NETWORK_TYPE, this.createNetworkState(this.lastNetworkState));
      }, this.loopNetStateTime * 1000);
    }
  }

  addNetworkListener(cb: (state?: NetworkState) => void): void {
    this.dispatch.on(this.NETWORK_TYPE, cb);
  }

  removeNetworkListener(cb: (state?: NetworkState) => void): void {
    this.dispatch.off(this.NETWORK_TYPE, cb);
  }
}

const instance = NetworkUtils.getInstance();
export default instance;
