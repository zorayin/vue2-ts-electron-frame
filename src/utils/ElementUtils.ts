export class ElementUtils {
  // 用来匹配eslint规则
  getBoundingClientRect<E extends Element>(ele?: E): DOMRect {
    let result: DOMRect = new DOMRect();
    if (ele) {
      result = ele.getBoundingClientRect();
    }
    return result;
  }
}

const instance = new ElementUtils();
export default instance;
