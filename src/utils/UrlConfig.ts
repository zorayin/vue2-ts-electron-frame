/*
 * @Author: 陈诗文
 * @Date: 2019-12-23 11:17:09
 * @LastEditTime: 2022-12-12 14:47:32
 * @LastEditors: Please set LastEditors
 * @Description: 本项目所有api服务链接
 * @FilePath: \audio-vision-platform\src\utils\UrlConfig.ts
 */
export namespace URLConfig {
  export const HOST = process.env.VUE_APP_HOST;
  const BASE_URL = process.env.VUE_APP_URL;

  export function getURLPath(path: string): string {
    return `${BASE_URL}${path}`;
  }
}
export default URLConfig;
