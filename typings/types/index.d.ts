/// <reference path="./wx/index.d.ts" />

declare module "*.svg" {
  const result: string;

  export default result;
}

declare type IPlan = {
  id: number;
  taskType: string;
  title: string;
  description: string;
  // intervel: string;
  startTime: string;
  endTime: string;
  allSignDays: number;
  signedDays: string[];
  status: IPlanStatus;
  cover: string;
};

/** 任务状态： 进行中、未开始、完成、未完成 */
declare type IPlanStatus = "process" | "done" | "fail" | "await";

declare type IFilterItem = {
  label: string;
  status: IPlanStatus | "all";
};

declare type ClsObject = {
  [K in string | number]: string;
};

declare type ClsParams = (string | number | Array<ClsParams> | ClsObject)[];

declare type ITaskType = "read" | "sport" | "other";

declare type ITaskItem = {
  type: ITaskType;
  label: string;
};

declare type IIntervel = "day" | "week" | "month" | "wrokday";

declare type IIntervelItem = {
  type: IIntervel;
  label: string;
};

declare type ISignCalendar = {
  year: number;
  month: number;
};

declare type ICalendarCell = {
  year: number;
  month: number;
  date: number;
  day: number;
  dateStr: string;
};
