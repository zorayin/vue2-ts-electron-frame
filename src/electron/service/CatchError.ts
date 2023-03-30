/*
 * @Author:lzh
 * @Date: 2022-03-24 11:39:12
 * @LastEditTime: 2022-11-14 18:04:06
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \audio-vision-platform\src\electron\app\crashReporter.ts
 */

import JsonFilestaticant from "../constants/JsonFileConstant";
import fs from "fs";
import path from "path";
import FileHelper from "../api/utils/FileHelper";
import DateHelper from "../api/utils/DateHelper";
const Package = require("../../../package.json");

export default class CatchError {
  constructor() {
    if (process.type === "browser") {
      /*
       * 检测代码当前运行在主进程还是渲染进程中
       * 在主进程中，监听Node的‘uncaughtException’事件
       */
      process.on("uncaughtException", this.sendUncaughtException);
    } else {
      /*
       * 在渲染进程中，向全局对象添加监听事件
       * window.addEventListener("error", this.sendUncaughtException);
       */
    }
  }

  sendUncaughtException(error: Error): void {}

  consoleLog(log: string, src: string, descriptionX: string): void {}
}
