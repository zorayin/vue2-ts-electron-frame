/*
 * @Author: your name
 * @Date: 2020-05-13 15:41:14
 * @LastEditTime: 2022-10-31 18:18:45
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\global\index.ts
 */

import { MagicNum } from "@/utils/MagicNum";
import ViewNames from "@/utils/ViewNames";
import EventTypes from "@/utils/EventTypes";
import UnitTypes from "@/utils/UnitTypes";
import GeneralViewHelper from "@/views/utils/GeneralViewHelper";
import SecureHelper from "@/views/utils/SecureHelper";
import { RegUtils } from "@/utils/RegUtils";
import { GlobalUtils } from "@/utils/GlobalUtils";
import ElementUtils from "@/utils/ElementUtils";

Object.assign(window, {
  MagicNum,
  ViewNames,
  UnitTypes,
  EventTypes,
  GeneralViewHelper,
  SecureHelper,
  ElementUtils,
  RegUtils: new RegUtils(),
  GlobalUtils: new GlobalUtils()
});

/** 对一些库的扩展 */
