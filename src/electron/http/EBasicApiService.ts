/*
 * @Author: your name
 * @Date: 2021-12-08 18:04:32
 * @LastEditTime: 2022-11-11 10:26:23
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \audio-vision-platform\src\electron\http\baseApiService.ts
 */
const { net } = require("electron");
const { app } = require("electron");
export default class EBasicApiService {
  protected async postRawJSON(url: string, data?: string): Promise<Electron.IncomingMessage> {
    await app.whenReady();
    const asyncRes: Promise<Electron.IncomingMessage> = new Promise((resolve) => {
      const request = net.request({
        method: "POST",
        url
      });
      if (data) {
        request.write(data);
      }
      request.on("response", (response) => {
        resolve(response);
      });
      request.end();
    });

    return asyncRes;
  }
}
