import { CACHE_KEY_TASKS } from "../../constants/index";
import { formatDateString, minMax } from "../../utils/util";

let timer: undefined | number = undefined;

function getCalendars(startDate: string, endDate: string): ISignCalendar[] {
  const arr: ISignCalendar[] = [];
  let [year, month] = startDate.split("/").map(Number);
  const [endYear, endMonth] = endDate.split("/").map(Number);

  while (year < endYear || month <= endMonth) {
    arr.push({ year, month });
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  console.log(arr);

  return arr;
}

Page({
  data: {
    plans: [] as IPlan[],
    plan: {} as IPlan,
    signToday: false,
    pressed: false,
    calendar: [] as ISignCalendar[],
    process: 10,
  },

  onLoad() {
    const id = this.options.id;
    const plans: IPlan[] = wx.getStorageSync(CACHE_KEY_TASKS);
    if (plans && id) {
      const plan = plans.find((item) => item.id == +id);
      if (plan) {
        const now = formatDateString(Date.now());
        this.setData({
          plans,
          plan,
          process: minMax(
            (plan.signedDays.length / plan.allSignDays) * 100,
            10,
            100
          ),
          signToday: plan.signedDays.includes(now),
          calendar: getCalendars(plan.startTime, plan.endTime),
        });
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
        let plan: IPlan | null = null;
        plans.some((item, index) => {
          if (item.id === this.data.plan.id) {
            const signedDays = [
              ...item.signedDays,
              formatDateString(new Date()),
            ];
            const _item = { ...item, signedDays };
            const _arr = [...plans];
            _arr.splice(index, 1, _item);
            if (_item.signedDays.length === _item.allSignDays) {
              _item.status === "done";
            }
            plan = _item;
            wx.setStorageSync(CACHE_KEY_TASKS, _arr);
            return true;
          }
          return false;
        });

        this.setData({ signToday: true, plan: plan ? plan : this.data.plan });
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
