/*
 * @Author: your name
 * @Date: 2021-01-18 15:27:58
 * @LastEditTime: 2021-03-16 18:22:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\utils\RegUtils.ts
 */

export class RegUtils {
  isLegalIP(str: string): boolean {
    const reg =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (reg.test(str) || this.isLegalIPPort(str)) {
      return true;
    }
    return false;
  }

  isLegalIPPort(str: string): boolean {
    const reg =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
    return reg.test(str);
  }
}

export type IRegUtils = RegUtils;

const instance = new RegUtils();
export default instance;
