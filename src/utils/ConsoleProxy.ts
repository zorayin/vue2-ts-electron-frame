/*
 * @Author: your name
 * @Date: 2020-05-30 10:26:06
 * @LastEditTime: 2021-12-17 09:22:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\utils\ConsoleProxy.ts
 */
export class ConsoleProxy {
  cacheLog: { type: string; msg: string; options: unknown[] }[] = [];

  private maxLog = 500;

  private mConsole = {
    log: console.log,
    info: console.info,
    debug: console.debug,
    warn: console.warn,
    error: console.error
  };

  isDebug = false;
  isWinMode = false;

  constructor() {}

  init(): void {
    const { flushLogList, mConsole } = this;
    console.log = function (message?: string, ...optionalParams: unknown[]) {
      flushLogList("log", message, optionalParams);
      mConsole.log.apply(this, [message, ...optionalParams]);
    };
    console.info = function (message?: string, ...optionalParams: unknown[]) {
      flushLogList("info", message, optionalParams);
      mConsole.info.apply(this, [message, ...optionalParams]);
    };
    console.debug = function (message?: string, ...optionalParams: unknown[]) {
      flushLogList("debug", message, optionalParams);
      mConsole.debug.apply(this, [message, ...optionalParams]);
    };
    console.warn = function (message?: string, ...optionalParams: unknown[]) {
      flushLogList("warn", message, optionalParams);
      mConsole.warn.apply(this, [message, ...optionalParams]);
    };
    console.error = function (message?: string, ...optionalParams: unknown[]) {
      flushLogList("error", message, optionalParams);
      mConsole.error.apply(this, [message, ...optionalParams]);
    };
  }

  flushLogList(type: string, message: string = "", optionalParams: unknown[]): void {
    if (this.isDebug) {
      this.cacheLog.push({
        type,
        msg: message,
        options: optionalParams
      });
      let sliceLen = this.cacheLog.length - this.maxLog;
      if (sliceLen <= 0) {
        sliceLen = 0;
      }
      this.cacheLog.splice(0, sliceLen);
    }
  }
}

const instance = new ConsoleProxy();
export default instance;
