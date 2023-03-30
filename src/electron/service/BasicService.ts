/*
 * @Author: csw
 * @Date: 2021-10-19 15:46:20
 * @LastEditTime: 2022-11-14 17:50:58
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: 基础服务类
 * @FilePath: \audio-vision-platform\src\electron\service\BasicService.ts
 */
import BasicApplication from "../app/BasicApplication";

export default abstract class BasicService<T extends BasicApplication> {
  id = "";
  context!: T;

  constructor(context: T) {
    this.context = context;
    this.id = this.context.registerServiceById(this.serviceId(), this);
  }

  // 重写服务id
  serviceId(): string {
    return "";
  }

  beforeBindService(context: T): void {}

  abstract bindService(context: T): void;
}
