/*
 * @Author: 罗振辉 185912680@qq.com
 * @Date: 2022-10-25 13:42:45
 * @LastEditors: 陈诗文 171287313@qq.com
 * @LastEditTime: 2022-12-24 10:27:41
 * @FilePath: \audio-vision-platform\src\electron\app\preload.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * All of the Node.js APIs are available in the preload process.
 * It has the same sandbox as a Chrome extension.
 */

document.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string): void => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    const text = process.versions[type];
    if (text) {
      replaceText(`${type}-version`, text);
    }
  }
});
