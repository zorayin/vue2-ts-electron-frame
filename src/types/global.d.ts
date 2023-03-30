/* eslint-disable no-inner-declarations */
/* eslint-disable init-declarations */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */

/*
 * @Author: 陈诗文
 * @Date: 2019-12-23 11:17:09
 * @LastEditTime: 2022-12-20 17:45:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \audio-vision-platform\src\types\global.d.ts
 */
import { GlobalUtils as IGlobalUtils } from "../utils/GlobalUtils";
import { IViewNames } from "../utils/ViewNames";
import { IEventTypes } from "../utils/EventTypes";
import { IUnitTypes } from "../utils/UnitTypes";
import { GeneralViewHelper as IGeneralViewHelper } from "@/views/utils/GeneralViewHelper";
import { SecureHelper } from "@/views/utils/SecureHelper";
import { RegUtils as IRegUtils } from "../utils/RegUtils";
import { ElementUtils as IElementUtils } from "../utils/ElementUtils";
import { MagicNum as IMagicNum } from "@/utils/MagicNum";
import IVue from "vue";
import IElectron from "electron";

declare global {
  var GlobalUtils: IGlobalUtils;
  // var StylePanelTypes: IStylePanelTypes;
  var ViewNames: IViewNames;
  var EventTypes: IEventTypes;
  var AlignTypes: IAlignTypes;
  var FillTypes: IFillTypes;
  var SCutEventTypes: ISCutEventTypes;
  var UnitTypes: IUnitTypes;
  var RepealRecoverHelper: IRepealRecoverHelper;
  var ArrayTypes: IArrayTypes;
  var ChannelTypes: IChannelTypes;
  var LayoutNames: ILayoutNames;
  var Constants: IConstants;
  var GraphicUtils: IGraphicUtils;
  var GeneralViewHelper: IGeneralViewHelper;
  // var SecureHelper: ISecureHelper;
  var SecureHelper: SecureHelper;
  var DebounceThrottle: IDebounceThrottle;
  var RegUtils: IRegUtils;
  var CloudControl: ICloudControl;
  var RepealRecoverTypes: IRepealRecoverTypes;
  var ElectronKeyNames: IElectronKeyNames;
  var ElementUtils: IElementUtils;
  var MagicNum: typeof IMagicNum;
  var NewWindow: NWindow;
  var Electron: typeof IElectron | null;
}
