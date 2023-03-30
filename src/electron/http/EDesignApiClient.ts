/*
 * @Author: your name
 * @Date: 2021-12-08 18:27:56
 * @LastEditTime: 2022-11-18 09:30:17
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \audio-vision-platform\src\electron\http\EDesignApiClient.ts
 */
import EBasicApiService from "./EBasicApiService";
class EDesignApiClient extends EBasicApiService {}
const apiService = new EDesignApiClient();
export default apiService;
