/*
 * @Author: 陈诗文
 * @Date: 2020-02-19 16:09:37
 * @LastEditTime: 2023-01-11 17:01:47
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: 该类作用于组件api服务
 * @FilePath: \audio-vision-platform\src\http\ViewApiClient.ts
 */
import BasicApiService from "./BasicApiService";

import { Message } from "element-ui";
const iMessage = Message;
class ViewApiClient extends BasicApiService {
 
}

const apiService = new ViewApiClient();
export default apiService;
