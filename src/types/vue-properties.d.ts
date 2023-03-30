/*
 * @Author: 陈诗文
 * @Date: 2020-03-26 18:08:43
 * @LastEditTime: 2022-12-20 17:45:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\types\vue-properties.d.ts
 */
import { ConsoleProxy } from "@/utils/ConsoleProxy";

import { GlobalUtils as IIGlobalUtils } from "@/utils/GlobalUtils";
import { RegUtils as IIRegUtils } from "../utils/RegUtils";

declare module "vue/types/vue" {
  interface Vue {
    $moment: unknown;
    $electron: Window.ElectronHelper;
    $format: (ms: number | Date | string, formatStr: string) => string;
    $addLocalStorage: (key: string, value: string) => void;
    $getLocalStorage: (key: string) => string | null;
    getPageThumUrl: () => void;
    getProThumUrl: () => void;
    getResourceUrl: () => void;
    getVideoUrl: () => void;
    fuzzyQuery: () => void;
    startInputWS: () => void;
    stopInputWS: () => void;
    vBroadcast: BroadcastWS;
    vConsole: ConsoleProxy;
    globalClick: () => void;
    $loadMode: number;
  }
  interface VueConstructor {
    install: (nVue: VueConstructor) => void;
  }
}


declare module "@gdcs/generalutilslib/packages/utils/RegUtils" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IRegUtils extends IIRegUtils {}
}
declare module "@gdcs/generalutilslib/packages/utils/GlobalUtils" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IGlobalUtils extends IIGlobalUtils {}
}

// 扩展lib.dom.d.ts
declare module "lib.dom.d.ts" {
  interface HTMLElement {
    currentStyle?: CSSStyleDeclaration;
  }
  interface WheelEvent {
    wheelDelta: number;
  }
}
