/*
 * @Author: your name
 * @Date: 2020-05-30 14:57:33
 * @LastEditTime: 2021-10-22 12:07:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\WebCompat.ts
 */
if (!GlobalUtils.isSafariBrowser()) {
  /*
   * 解决浏览器触摸模式的默认行为
   * document.addEventListener(
   *   "touchstart",
   *   e => {
   *     e.preventDefault();
   *   },
   *   { passive: false }
   * );
   * document.addEventListener(
   *   "touchmove",
   *   (e: TouchEvent) => {
   *     e.preventDefault();
   *   },
   *   { passive: false }
   * );
   */
}
//屏蔽右键菜单
document.oncontextmenu = function (ev) {
  return false;
};
document.body.addEventListener("touchstart", () => {}); //ios端监听屏幕触摸事件，空函数就可以了。
