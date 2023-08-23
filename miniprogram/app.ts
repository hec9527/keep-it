import { CACHEK_KEY_USER_INFO, CACHE_KET_LAST_LOGIN } from "./constants/index";
import { formatTime } from "./utils/util";

App<IAppOption>({
  globalData: {},
  onLaunch() {
    const userInfo = wx.getStorageSync(CACHEK_KEY_USER_INFO);
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    } else {
      wx.redirectTo({ url: `/pages/login/login` });
    }

    const lastLogin = wx.getStorageSync(CACHE_KET_LAST_LOGIN);
    this.globalData.lastLogin = lastLogin;

    wx.setStorageSync(CACHE_KET_LAST_LOGIN, formatTime(new Date()));

    // 登录
    // wx.login({
    //   success: (res) => {
    //     console.log(res.code);
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // });
  },
});
