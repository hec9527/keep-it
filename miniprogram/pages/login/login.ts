import { CACHEK_KEY_USER_INFO } from "../../constants/index";

const app = getApp();

Page({
  handleLogin() {
    wx.getUserInfo({
      withCredentials: false,
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        console.log(res);
        wx.setStorageSync(CACHEK_KEY_USER_INFO, res.userInfo);
        const url = this.options ? this.options.redirectUrl : undefined;
        wx.redirectTo({ url: url || "/pages/index/index" });
      },
    });
  },
});
