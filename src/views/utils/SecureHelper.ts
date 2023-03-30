/*
 * @Author: wfy
 * @Date: 2020-04-28 10:23:57
 * @LastEditTime: 2021-04-02 10:05:06
 * @LastEditors: Please set LastEditors
 * @Description: 主要是关于安全加密的方法
 * @FilePath: \audio-vision-platform\src\views\utils\SecureHelper.ts
 */
// export type ISecureHelper = SecureHelper;
interface LoginInfo {
  userId: number;
  roleId: number;
  isRememberPW: boolean;
  userInfos: {
    username: string;
    password: string;
  };
}

export class SecureHelper {
  //获取存储在localStorage里的登录用户信息
  getLoginInfo(): LoginInfo | null {
    const info = localStorage.getItem("loginInfo");
    if (!info) return null;
    const tempInfo = JSON.parse(window.decodeURIComponent(window.atob(info))); //解码
    return tempInfo;
  }

  getToken(): string | null {
    let token = localStorage.getItem("token");
    if (!token) return null;
    token = JSON.parse(window.decodeURIComponent(window.atob(token))); //解码
    return token;
  }
}

const instance = new SecureHelper();
export default instance;
