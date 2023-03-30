class UnitTypes {
  readonly SECONDS: string = "秒";
  readonly MINUTE: string = "分";
  readonly HOUR: string = "时";
  readonly DAY: string = "日";
  readonly MONTH: string = "月";
  readonly YEAR: string = "年";
  readonly PIXEL: string = "px";
}

export type IUnitTypes = UnitTypes;

const instance = new UnitTypes();
export default instance;
