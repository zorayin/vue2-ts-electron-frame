/*
 * @Author: 陈诗文
 * @Date: 2019-12-23 11:17:09
 * @LastEditTime: 2020-04-29 13:51:50
 * @LastEditors: 陈诗文
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\utils\listener.ts
 */
import Vue from "vue";
const listenerManagerMap = new WeakMap();

export class ListenerManager {
  target: HTMLElement | Node;
  list: [string, unknown, boolean, HTMLElement | undefined][];

  constructor(target: HTMLElement | Node = document) {
    this.target = target;
    this.list = [];
  }

  static for(vm: Vue): ListenerManager {
    if (!listenerManagerMap.has(vm)) {
      listenerManagerMap.set(vm, new ListenerManager().removeAuto(vm));
    }
    return listenerManagerMap.get(vm);
  }

  add<K extends keyof HTMLElementEventMap>(
    type: K | string,
    fn: (ev: HTMLElementEventMap[K]) => void | EventListener,
    capture = false,
    target?: HTMLElement
  ): this {
    if (target instanceof HTMLElement) {
      target.addEventListener(type as K, fn, capture);
    } else if (this.target instanceof HTMLElement) {
      this.target.addEventListener(type as K, fn, capture);
    } else {
      this.target.addEventListener(type, fn as EventListener, capture);
    }
    this.list.push([type, fn, capture, target]);
    return this;
  }

  remove(type: string): this {
    for (let i = 0; i < this.list.length; ) {
      if (this.list[i][0] === type) {
        (this.list[i][3] || this.target).removeEventListener(
          ...(this.list[i].slice(0, -1) as [string, EventListener, boolean])
        );
        this.list.splice(i, 1);
      } else {
        i = i + 1;
      }
    }
    return this;
  }

  removeAll(): this {
    this.list.forEach((x) => {
      (x[3] || this.target).removeEventListener(
        ...(x.slice(0, -1) as [string, EventListener, boolean])
      );
    });
    this.list.length = 0;
    return this;
  }

  removeAuto(vm: Vue): this {
    vm.$once("hook:beforeDestroy", () => this.removeAll());
    return this;
  }
}
