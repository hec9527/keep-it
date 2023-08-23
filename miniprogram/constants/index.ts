export const Tasks: ITaskItem[] = [
  {
    type: "read",
    label: "阅读" as const,
  },
  {
    type: "sport",
    label: "运动" as const,
  },
  {
    type: "other",
    label: "其他" as const,
  },
];

export const Intervel: IIntervelItem[] = [
  {
    type: "day",
    label: "每天",
  },
  {
    type: "week",
    label: "每周",
  },
  {
    type: "month",
    label: "每月",
  },
  {
    type: "wrokday",
    label: "工作日",
  },
];

export const Filters: IFilterItem[] = [
  { label: "全部", status: "all" },
  { label: "进行中", status: "process" },
  { label: "未开始", status: "await" },
  { label: "已完成", status: "done" },
  { label: "已放弃", status: "fail" },
];

export const CACHEK_KEY_USER_INFO = "USER_INFO";

export const CACHE_KEY_TASKS = "PLAN_TASKS";

export const CACHE_KET_LAST_LOGIN = "LAST_LOGIN";
