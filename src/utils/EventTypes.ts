/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */
/*
 * @Author: 陈诗文
 * @Date: 2019-12-23 11:17:09
 * @LastEditTime: 2022-12-15 13:41:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\utils\EventTypes.ts
 */
class EventTypes {}
export type IEventTypes = EventTypes;

/**
 * 分发的第一个事件参数
 */
export interface EventArgMapF {
  "network-state": { online: boolean };
}

/**
 * 分发的第二个事件参数
 */
export interface EventArgMapS {}

/**
 * 分发的第三个事件参数
 */
export interface EventArgMapT {}
const instance = new EventTypes();
export default instance;
