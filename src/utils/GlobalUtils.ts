type BrowserType = "edge" | "ie" | "firefox" | "chrome" | "opera" | "safari";
export type BrowserInfo = Record<BrowserType, number>;
export type BrowserRegName = Record<BrowserType, RegExp[]>;
export class GlobalUtils {
  formatToRGBAInt(str: string): string {
    const reg = /(rgba\(\s*\d+,\s*\d+,\s*\d+,)(\s*[\d.]{1,4})\)/g;
    return str.replace(reg, (i1: string, i2: string, i3: string) => {
      let param: number | string = parseFloat(i3);
      // tslint:disable-next-line:no-magic-numbers
      param <= 1 && (param = Math.round(param * 255));
      param = `${i2}${param})`.replace(/\s/g, "");
      return param;
    });
  }

  formatToRGBAFloat(str: string): string {
    const reg = /(rgba\(\s*\d+,\s*\d+,\s*\d+,)(\s*[\d.]{1,3})\)/g;
    return str.replace(reg, (i1: string, i2: string, i3: string) => {
      let tempAttr: number | string = parseFloat(i3);
      tempAttr > 1 && (tempAttr = (tempAttr / 255).toFixed(2));
      tempAttr = `${i2}${tempAttr})`;
      return tempAttr;
    });
  }

  isSafariBrowser(): boolean {
    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  }

  getDevType(): typeof res {
    const ua = navigator.userAgent;
    const isWindowsPhone = /(?:Windows Phone)/.test(ua);
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    const isAndroid = /(?:Android)/.test(ua);
    const isFireFox = /(?:Firefox)/.test(ua);
    const isChrome = /(?:Chrome|CriOS)/.test(ua);
    const isTablet =
      /(?:iPad|PlayBook)/.test(ua) ||
      (isAndroid && !/(?:Mobile)/.test(ua)) ||
      (isFireFox && /(?:Tablet)/.test(ua));
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
    const isPc = !isPhone && !isAndroid && !isSymbian;
    const res = {
      isTablet,
      isPhone,
      isAndroid,
      isPc
    };

    return res;
  }

  serialRequestParam(param: Record<string, unknown>): string {
    let requestParam = "";
    Object.keys(param).forEach((element) => {
      if (Array.isArray(param[element])) {
        requestParam = `${requestParam}${element}=${(param[element] as string[]).join(
          `&${element}=`
        )}&`;
      } else {
        requestParam = `${requestParam}${element}=${param[element]}&`;
      }
    });
    return requestParam;
  }

  getBrowserName(): BrowserInfo {
    const sys: BrowserInfo = {
      edge: 0,
      ie: 0,
      firefox: 0,
      chrome: 0,
      opera: 0,
      safari: 0
    };
    const browserReg: BrowserRegName = {
      edge: [/edge\/([\d.]+)/],
      ie: [/rv:([\d.]+)\) like gecko/, /msie ([\d.]+)/],
      firefox: [/firefox\/([\d.]+)/],
      chrome: [/chrome\/([\d.]+)/],
      opera: [/opera.([\d.]+)/],
      safari: [/version\/([\d.]+).*safari/]
    };

    const ua = navigator.userAgent.toLowerCase();

    (Object.keys(browserReg) as BrowserType[]).some((key) => {
      let flag = false;
      browserReg[key].forEach((reg) => {
        const res = ua.match(reg);
        if (res) {
          if (key === "chrome") {
            const var1 = 43;
            const ver = res[1].toLowerCase();
            const arr = ver.split(".");
            if (parseInt(arr[0]) > var1) {
              sys[key] = 1;
            }
            sys[key] = 0;
          } else {
            sys[key] = 1;
          }

          flag = true;
        }
      });
      return flag;
    });
    return sys;
  }

  removeObjAttr(target: Record<string, unknown>): void {
    Object.keys(target).forEach((key: string, index) => {
      delete target[key];
    });
  }

  getArrayIndex(
    target: Record<string, unknown>[] | undefined,
    key: string,
    value: unknown
  ): number {
    if (target === undefined) {
      throw "array not be null";
    }
    let position = -1;
    target.some((ele, index) => {
      if (ele[key] === value) {
        position = index;
        return true;
      }
      return false;
    });
    return position;
  }

  getArraySize(target?: unknown[]): number {
    if (!target || !Array.isArray(target)) {
      return 0;
    }
    return target.length;
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

  dataURItoBlob(dataURI: string): Blob {
    let byteString = null;
    if (dataURI.split(",")[0].indexOf("base64") >= 0) {
      byteString = atob(dataURI.split(",")[1]);
    } else {
      byteString = unescape(dataURI.split(",")[1]);
    }
    const [mimeString] = dataURI.split(",")[0].split(":")[1].split(";");
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {
      type: mimeString
    });
  }

  isFunction(o: unknown): boolean {
    return toString.call(o) === "[object Function]";
  }

  isString(o: unknown): boolean {
    return toString.call(o) === "[object String]";
  }

  isBoolean(o: unknown): boolean {
    return toString.call(o) === "[object Boolean]";
  }

  isObject(o: unknown): boolean {
    return o === Object(o);
  }

  isNumber(o: unknown): boolean {
    return toString.call(o) === "[object Number]";
  }

  // simulateKeyEvent(
  //   target: HTMLLIElement | null /*:HTMLElement*/,
  //   type: string /*:String*/,
  //   bubbles: boolean /*:Boolean*/,
  //   cancelable: boolean /*:Boolean*/,
  //   view: Window /*:Window*/,
  //   ctrlKey: boolean /*:Boolean*/,
  //   altKey: boolean /*:Boolean*/,
  //   shiftKey: boolean /*:Boolean*/,
  //   metaKey: boolean /*:Boolean*/,
  //   keyCode: number /*:int*/,
  //   charCode: number
  // ): void /*:Void*/ {
  //   const doc = document;
  //   // check target
  //   if (!target) {
  //     throw "simulateKeyEvent(): Invalid target.";
  //   }

  /*
   *   let type2 = type;
   *   let bubbles2 = bubbles;
   *   let cancelable2 = cancelable;
   *   let view2 = view;
   *   let ctrlKey2 = ctrlKey;
   *   let altKey2 = altKey;
   *   let shiftKey2 = shiftKey;
   *   let metaKey2 = metaKey;
   *   let keyCode2 = keyCode;
   *   let charCode2 = charCode;
   *   // check event type
   *   if (this.isString(type)) {
   *     type2 = type.toLowerCase();
   *     switch (type) {
   *       case "textevent": //DOM Level 3
   *         type2 = "keypress";
   *         break;
   *       case "keyup":
   *       case "keydown":
   *       case "keypress":
   *         break;
   *       default:
   *         throw `simulateKeyEvent(): Event type ${type} not supported`;
   *     }
   *   } else {
   *     throw "simulateKeyEvent(): Event type must be a string.";
   *   }
   */

  /*
   *   // setup default values
   *   if (!this.isBoolean(bubbles)) {
   *     bubbles2 = true; //all key events bubble
   *   }
   *   if (!this.isBoolean(cancelable)) {
   *     cancelable2 = true; //all key events can be cancelled
   *   }
   *   if (!this.isObject(view)) {
   *     view2 = window; //view is typically window
   *   }
   *   if (!this.isBoolean(ctrlKey)) {
   *     ctrlKey2 = false;
   *   }
   *   if (!this.isBoolean(altKey)) {
   *     altKey2 = false;
   *   }
   *   if (!this.isBoolean(shiftKey)) {
   *     shiftKey2 = false;
   *   }
   *   if (!this.isBoolean(metaKey)) {
   *     metaKey2 = false;
   *   }
   *   if (!this.isNumber(keyCode)) {
   *     keyCode2 = 0;
   *   }
   *   if (!this.isNumber(charCode)) {
   *     charCode2 = 0;
   *   }
   */

  //   // try to create a mouse event
  //   let customEvent /*:MouseEvent*/ = null;

  /*
   *   // check for DOM-compliant browsers first
   *   if (this.isFunction(doc.createEvent)) {
   *     try {
   *       // try to create key event
   *       customEvent = doc.createEvent("KeyEvents");
   */

  //       /*
  //        * Interesting problem: Firefox implemented a non-standard
  //        * version of initKeyEvent() based on DOM Level 2 specs.
  //        * Key event was removed from DOM Level 2 and re-introduced
  //        * in DOM Level 3 with a different interface. Firefox is the
  //        * only browser with any implementation of Key Events, so for
  //        * now, assume it"s Firefox if the above line doesn"t error.
  //        */
  //       // @TODO: Decipher between Firefox"s implementation and a correct one.
  //       customEvent.initKeyEvent(
  //         type2,
  //         bubbles2,
  //         cancelable2,
  //         view2,
  //         ctrlKey2,
  //         altKey2,
  //         shiftKey2,
  //         metaKey2,
  //         keyCode2,
  //         charCode2
  //       );
  //     } catch (ex) {
  //       /*
  //        * If it got here, that means key events aren"t officially supported.
  //        * Safari/WebKit is a real problem now. WebKit 522 won"t let you
  //        * set keyCode, charCode, or other properties if you use a
  //        * UIEvent, so we first must try to create a generic event. The
  //        * fun part is that this will throw an error on Safari 2.x. The
  //        * end result is that we need another try...catch statement just to
  //        * deal with this mess.
  //        */
  //       try {
  //         //try to create generic event - will fail in Safari 2.x
  //         customEvent = doc.createEvent("Events");
  //       } catch (error) {
  //         //the above failed, so create a UIEvent for Safari 2.x
  //         customEvent = doc.createEvent("UIEvents");
  //       } finally {
  //         (customEvent as unknown as Event).initEvent(type2, bubbles2, cancelable2);

  /*
   *         //initialize
   *         customEvent.view = view2;
   *         customEvent.altKey = altKey2;
   *         customEvent.ctrlKey = ctrlKey2;
   *         customEvent.shiftKey = shiftKey2;
   *         customEvent.metaKey = metaKey2;
   *         customEvent.keyCode = keyCode2;
   *         customEvent.charCode = charCode2;
   *       }
   *     }
   */

  /*
   *     //fire the event
   *     target.dispatchEvent(customEvent);
   *   } else if (this.isObject(doc.createEventObject)) {
   *     //IE
   */

  /*
   *     //create an IE event object
   *     customEvent = doc.createEventObject();
   */

  /*
   *     //assign available properties
   *     customEvent.bubbles = bubbles2;
   *     customEvent.cancelable = cancelable2;
   *     customEvent.view = view2;
   *     customEvent.ctrlKey = ctrlKey2;
   *     customEvent.altKey = altKey2;
   *     customEvent.shiftKey = shiftKey2;
   *     customEvent.metaKey = metaKey2;
   */

  //     /*
  //      * IE doesn"t support charCode explicitly. CharCode should
  //      * take precedence over any keyCode value for accurate
  //      * representation.
  //      */
  //     customEvent.keyCode = charCode2 > 0 ? charCode2 : keyCode2;

  /*
   *     //fire the event
   *     target.fireEvent(`on${type}`, customEvent);
   *   } else {
   *     throw "simulateKeyEvent(): No event simulation framework present.";
   *   }
   * }
   */

  /**
   * @description: 占位符替换
   * @param {target：格式化字符串, val: 替代占位的值， placehoder:自定义占位符默认为{val}}
   * @return {*}
   */
  replacePlaceholder(target: string, val: string, placehoder: string = "\\{val\\}"): string {
    return target.replace(new RegExp(placehoder, "g"), val);
  }

  //将Date转换为 2000-01-01 00：00：00
  formatData(time: Date | null): string | undefined {
    if (!time) return;
    const zero = (value: number): number | string => {
      if (value < 10) {
        return `0${value}`;
      }
      return value;
    };
    const myDate = new Date(time);
    const year = myDate.getFullYear();
    const month = zero(myDate.getMonth() + 1);
    const day = zero(myDate.getDate());
    const hour = zero(myDate.getHours());
    const minite = zero(myDate.getMinutes());
    const second = zero(myDate.getSeconds());

    const times = `${year}-${month}-${day} ${hour}:${minite}:${second}`;
    return times;
  }
}

const instance = new GlobalUtils();
export default instance;
