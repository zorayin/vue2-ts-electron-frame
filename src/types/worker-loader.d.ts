/*
 * @Author: lzh
 * @Date: 2021-08-09 16:55:43
 * @LastEditTime: 2021-08-09 16:59:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\worker-loader.d.ts
 */
declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}
