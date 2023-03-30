/*
 * @Author: your name
 * @Date: 2021-11-17 16:55:25
 * @LastEditTime: 2022-11-10 18:04:18
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \audio-vision-platform\src\electron\api\utils\ResponseBodyHelper.ts
 */
import { IResult, ResultType } from "../model/Result";

export default class ResponseBodyHelper {
  static createResBody<T>(type: ResultType, result: T, message: string | null): IResult<T> {
    return {
      type,
      result,
      message
    };
  }
}
