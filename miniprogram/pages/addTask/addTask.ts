import { Tasks, Intervel, CACHE_KEY_TASKS } from "../../constants/index";
import {
  getCover,
  getDaysFromNow,
  getDiffDays,
  getPlanStatus,
  formatDateString,
  addDay,
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
    maxEndTime: getDaysFromNow(180),
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
    const startTime = data.detail.value.replace(/-/g, "/");
    const sDate = new Date(startTime);
    this.setData({
      startTime,
      endTime: formatDateString(addDay(sDate, 7)),
      minEndTime: formatDateString(addDay(sDate, 1)),
    });
  },

  handleEndTimeChange(data: WechatMiniprogram.CustomEvent<{ value: string }>) {
    const endTime = data.detail.value.replace(/-/g, "/");
    const diffDays = getDiffDays(this.data.startTime, endTime);
    if (diffDays > 90) {
      // wx.showToast({ title: "计划周期不能超过90天" });
      wx.showModal({
        content: "计划周期不能超过90天",
        confirmText: "知道了",
        showCancel: false,
      });
      this.setData({
        endTime: formatDateString(addDay(this.data.startTime, 90)),
      });
    } else {
      this.setData({ endTime });
    }
  },

  checkData() {
    const d = this.data;
    if (!d.taskType) return "请选择计划类型";
    if (!d.title) return "给计划起一个名称";
    if (+new Date(d.endTime) < +new Date(d.startTime))
      return "开始时间不能小于结束时间";
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
