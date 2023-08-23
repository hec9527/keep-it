import { CACHE_KEY_TASKS } from "../../constants/index";
import { formatDateString, getDaysFromNow } from "../../utils/util";

let timer: undefined | number = undefined;

Page({
  data: {
    plans: [] as IPlan[],
    plan: {} as IPlan,
    signToday: false,
    pressed: false,
  },

  onLoad() {
    const id = this.options.id;
    const plans: IPlan[] = wx.getStorageSync(CACHE_KEY_TASKS);
    if (plans && id) {
      const plan = plans.find((item) => item.id == +id);
      if (plan) {
        let signToday = false;
        const now = getDaysFromNow();

        plan.signedDays.some((day) => {
          const str = formatDateString(day);
          if (str === now) {
            return (signToday = true);
          }
          return false;
        });

        this.setData({ plans, plan, signToday });
        return;
      }
    }
    wx.navigateBack();
  },

  handleTouchSign() {
    if (this.data.signToday) return;
    this.setData({ pressed: true }, () => {
      timer = setTimeout(() => {
        const plans = this.data.plans;
        plans.some((item, index) => {
          if (item.id === this.data.plan.id) {
            const signedDays = [...item.signedDays, +new Date()];
            const _item = { ...item, signedDays };
            const _arr = [...plans];
            _arr.splice(index, 1, _item);
            if (_item.signedDays.length === _item.allSignDays) {
              _item.status === "done";
            }
            wx.setStorageSync(CACHE_KEY_TASKS, _arr);
            return true;
          }
          return false;
        });

        this.setData({ signToday: true });
        wx.showToast({ icon: "success", title: "打卡成功" });
      }, 3000);
    });
  },

  handleEndSign() {
    if (this.data.signToday) return;
    timer && clearTimeout(timer);
    this.setData({ pressed: false });
  },
});
