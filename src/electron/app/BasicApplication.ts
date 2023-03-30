/*
 * @Author: csw
 * @Date: 2021-08-05 10:41:37
 * @LastEditTime: 2022-10-31 14:36:16
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: 启动应用
 * @FilePath: \audio-vision-platform\src\electron\app\BasicApplication.ts
 */
import AppConstants from "../constants/AppConstants";
import { app, BrowserWindow } from "electron";
import BasicService from "../service/BasicService";

export default abstract class BasicApplication {
  // 桌面端的数据来源是server还是本地数据
  mode = 1;
  targetUrl = "";
  app!: Electron.App;
  mainWin!: BrowserWindow;
  services!: Map<string, BasicService<BasicApplication>>;

  startApplication(win: BrowserWindow): void {
    this.app = app;
    this.mainWin = win;

    if (!(this.mainWin as BrowserWindow | undefined)) {
      throw new Error("main win not be null!");
    }
    this.services = new Map();
  }

  switchMode(mode: number): this {
    this.mode = mode;
    AppConstants.LOCAL_MODE = mode;
    return this;
  }

  switchTargetUrl(url: string): this {
    this.targetUrl = url;
    return this;
  }

  registerService(service: BasicService<BasicApplication>): string {
    return this.registerServiceById(GlobalUtils.generateUUID(), service);
  }

  registerServiceById(id: string, service: BasicService<BasicApplication>): string {
    if (!id) return this.registerService(service);

    try {
      service.beforeBindService(service.context);
      this.services.set(id, service);
      service.bindService(service.context);
      return id;
    } catch (error) {
      console.error(`初始化服务出错 ${error}`);
    }
    return "";
  }
}
