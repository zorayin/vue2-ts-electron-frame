/*
 * @Author: your name
 * @Date: 2021-11-09 17:07:50
 * @LastEditTime: 2022-11-09 17:53:53
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \audio-vision-platform\src\electron\api\model\Result.ts
 */
export enum ResultType {
  TYPE_OK = "SUCCESS",
  TYPE_ERROR = "ERROR",
  TYPE_INVALID = "INVALID",
  TYPE_ISEMPTY = "EMPTY",
  TOKEN_ISEMPTY = "TOKEN.ISEMPTY",
  TOKEN_INVALID = "TOKEN.INVALID"
}

export interface IResult<T> {
  message: string | null;
  result: T;
  type: ResultType;
}
