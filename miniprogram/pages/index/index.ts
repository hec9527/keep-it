import { CACHE_KEY_TASKS, Filters } from "../../constants/index";

const app = getApp<IAppOption>();

Page({
  data: {
    userInfo: {} as WechatMiniprogram.UserInfo,
    allTasks: [] as IPlan[],
    tasks: [] as IPlan[],
    visible: false,
    filters: Filters,
    filterStatus: "all" as IFilterItem["status"],
    lastLogin: "无",
  },

  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo,
      lastLogin: app.globalData.lastLogin,
    });
  },

  onShow() {
    const res: IPlan[] = wx.getStorageSync(CACHE_KEY_TASKS);
    console.log("计划：", res);
    if (res) {
      this.setData({ allTasks: res, tasks: res });
    }
  },

  handleFilterClick(data: WechatMiniprogram.CustomEvent<any>) {
    const status = data.currentTarget.dataset.status;
    console.log(status);
    const tasks = this.data.allTasks.filter(
      (task) => task.status === status || status === "all"
    );
    this.setData({ filterStatus: status, tasks });
  },

  handlePlanTap(data: WechatMiniprogram.CustomEvent<any>) {
    const id = data.currentTarget.dataset.id;
    const type = data.currentTarget.dataset.type;
    if (id) {
      wx.navigateTo({ url: `/pages/viewPlan/viewPlan?id=${id}&type=${type}` });
    }
  },

  toAboutPage() {
    wx.navigateTo({ url: "/pages/about/about" });
  },

  onTapAdd() {
    wx.navigateTo({ url: "/pages/addTask/addTask" });
  },
});
