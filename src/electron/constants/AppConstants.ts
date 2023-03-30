/*
 * @Author: csw
 * @Date: 2021-09-02 14:49:45
 * @LastEditTime: 2022-11-01 15:38:08
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: 应用级别的常量
 * @FilePath: \audio-vision-platform\src\electron\constants\AppConstants.ts
 */
export default class AppConstants {
  /**
   * 应用数据获取模式
   */
  static LOCAL_MODE = 0;
  static HTTP_MODE = 1;

  /**
   * api通讯常量
   */
  static GET_LODEMODE = "getLodeMode";
  static SET_STREAMDEVICEDATA = "setStreamDeviceData";
  static SET_FULLSCREEN = "setFullScreen";
  static GET_FULLSCREEN = "getFullScreen";
  static UPDATE_PREVIEW_INFO = "updatePreviewInfo";
  static GET_LISTBYDEVTYPE = "getListByDevType";
  static GET_LISTBYIP = "getListbyIp";
  static RE_LOADHOME = "reloadHome";
  static ELETRONAPP_RELAUNCH = "eletronappRelaunch";
  static APP_RESPONSE = "appResponse";
  static SET_UERMODE = "setUerMode";
}
