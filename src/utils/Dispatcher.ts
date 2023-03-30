/*
 * @Author: 陈诗文
 * @Date: 2019-12-23 11:17:09
 * @LastEditTime: 2022-06-08 13:45:30
 * @LastEditors: chenshiwen 171287313@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\utils\Dispatcher.ts
 */
import { EventArgMapF, EventArgMapS, EventArgMapT } from "./EventTypes";
const dispIns: string[] = [];

// type EventType = keyof EventMap;

const dispCbs: Record<string, unknown>[] = [];

class Dispatcher {
  private UUID = "";
  constructor() {
    this.UUID = this.generateUUID();
    dispCbs.push({});
    dispIns.push(this.UUID);
  }

  get token(): string {
    return this.UUID;
  }

  on<F extends keyof EventArgMapF, S extends keyof EventArgMapS, T extends keyof EventArgMapT>(
    type: F,
    cb: (argF?: EventArgMapF[F], argS?: EventArgMapS[S], argT?: EventArgMapT[T]) => void
  ): void {
    const cbtypes = (
      dispCbs as Record<
        string,
        | ((argF?: EventArgMapF[F], argS?: EventArgMapS[S], argT?: EventArgMapT[T]) => void)[]
        | undefined
      >[]
    )[dispIns.indexOf(this.UUID)];
    const cbs = cbtypes[type] || [];
    cbtypes[type] = cbs;
    if (!~cbs.indexOf(cb)) {
      cbs.push(cb);
    }
  }

  off<F extends keyof EventArgMapF, S extends keyof EventArgMapS, T extends keyof EventArgMapT>(
    type: F,
    cb: (argF?: EventArgMapF[F], argS?: EventArgMapS[S], argT?: EventArgMapT[T]) => void
  ): void {
    const cbtypes = (
      dispCbs as Record<
        string,
        | ((argF?: EventArgMapF[F], argS?: EventArgMapS[S], argT?: EventArgMapT[T]) => void)[]
        | undefined
      >[]
    )[dispIns.indexOf(this.UUID)];

    const cbs = cbtypes[type] || [];
    cbtypes[type] = cbs;

    const curTypeCbIdx = cbs.indexOf(cb);
    if (~curTypeCbIdx) {
      cbs.splice(curTypeCbIdx, 1);
    }
  }

  fire<F extends keyof EventArgMapF, S extends keyof EventArgMapS, T extends keyof EventArgMapT>(
    type: F,
    arg1?: EventArgMapF[F],
    arg2?: EventArgMapS[S],
    arg3?: EventArgMapT[T]
  ): void {
    (
      dispCbs as Record<
        string,
        | ((argF?: EventArgMapF[F], argS?: EventArgMapS[S], argT?: EventArgMapT[T]) => void)[]
        | undefined
      >[]
    ).forEach((ele) => {
      const cbs = ele[type] || [];
      ele[type] = cbs;

      cbs.forEach((cb) => {
        cb.apply(null as unknown, [arg1, arg2, arg3]);
      });
    });
  }

  recycleOne(uuid: string): void {
    const recyleIdx = dispIns.indexOf(this.UUID);
    dispCbs.splice(recyleIdx, 1);
    dispIns.splice(recyleIdx, 1);
  }

  recycle(): void {
    dispCbs.splice(0, dispCbs.length);
    dispIns.splice(0, dispIns.length);
  }

  generateUUID(): string {
    let d = new Date().getTime();
    const uuid = "hcxxx-xyxxx-xxxxx".replace(/[xy]/g, (c: string) => {
      const count = 16;
      const r = (d + Math.random() * count) % count | 0;
      d = Math.floor(d / count);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
}

export default Dispatcher;
