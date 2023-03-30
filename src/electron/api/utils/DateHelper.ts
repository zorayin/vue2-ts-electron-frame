/*
 * @Author: lzh
 * @Date: 2021-12-17 13:39:17
 * @LastEditTime: 2022-11-10 17:23:17
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \audio-vision-platform\src\electron\api\utils\DateHelper.ts
 */

export class DateHelper {
  getCurrentDateTime(): string {
    /*
     * const year = new Date().getFullYear();
     * const month = new Date().getMonth() + 1 < 10 ? "0" + new Date().getMonth() + 1 : new Date().getMonth() + 1;
     * const date = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
     * const hh = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours();
     * const mm = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
     * const ss = new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds();
     * const dateTime = `${year}-${month}-${date} ${hh}:${mm}:${ss}`;
     */
    const dataTool = new Date();
    let localeDate = dataTool.toLocaleDateString();
    localeDate = localeDate.replaceAll("/", "-");
    const dateTime = `${localeDate} ${dataTool.getHours()}:${dataTool.getMinutes()}:${dataTool.getSeconds()}`;
    return dateTime;
  }

  getLocaleDate(): string {
    const dataTool = new Date();
    let localeDate = dataTool.toLocaleDateString();
    localeDate = localeDate.replaceAll("/", "-");
    return localeDate;
  }
}

const instance = new DateHelper();
export default instance;
