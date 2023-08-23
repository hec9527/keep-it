import { Tasks, Intervel, CACHE_KEY_TASKS } from "../../constants/index";
import {
  getCover,
  getDaysFromNow,
  getDiffDays,
  getPlanStatus,
} from "../../utils/util";

Page({
  data: {
    taskType: "",
    taskTypeOptions: Tasks,
    // intervel: "每天",
    intervelOptions: Intervel,
    title: "",
    description: "",
    startTime: getDaysFromNow(),
    endTime: getDaysFromNow(7),
    minEndTime: getDaysFromNow(1),
  } as Omit<
    IPlan,
    "id" | "allSignDays" | "signedDays" | "status" | "cover" | "cover"
  >,

  handleInputChange(data: WechatMiniprogram.Input) {
    this.setData({ title: data.detail.value });
  },

  handleDescriptionChange(data: WechatMiniprogram.Input) {
    this.setData({ description: data.detail.value });
  },

  handleTaskTypeChange(
    data: WechatMiniprogram.CustomEvent<ITaskItem, AnyObject, AnyObject>
  ) {
    this.setData({ taskType: data.detail.label });
  },

  handleIntervelChange(
    data: WechatMiniprogram.CustomEvent<IIntervelItem, AnyObject, AnyObject>
  ) {
    this.setData({ intervel: data.detail.label });
  },

  handleStartTimeChange(
    data: WechatMiniprogram.CustomEvent<{ value: string }>
  ) {
    this.setData({ startTime: data.detail.value });
  },

  handleEndTimeChange(data: WechatMiniprogram.CustomEvent<{ value: string }>) {
    this.setData({ endTime: data.detail.value });
  },

  checkData() {
    const d = this.data;
    if (!d.taskType) return "请选择计划类型";
    if (!d.title) return "给计划起一个名称";
    return undefined;
  },

  handleCreateClick() {
    const res = this.checkData();
    if (res) {
      wx.showToast({ icon: "error", title: res });
      return;
    }

    let plans: IPlan[] = wx.getStorageSync(CACHE_KEY_TASKS);
    if (!plans) {
      plans = [];
    }
    const d = this.data;
    plans.push({
      id: +new Date(),
      title: d.title,
      taskType: d.taskType,
      description: d.description,
      // intervel: d.intervel,
      startTime: d.startTime,
      endTime: d.endTime,
      allSignDays: getDiffDays(d.startTime, d.endTime),
      signedDays: [],
      status: getPlanStatus(d.startTime, d.endTime),
      cover: getCover(d.taskType),
    });
    wx.setStorageSync(CACHE_KEY_TASKS, plans);
    wx.navigateBack();
  },
});
