export {};

const app = getApp();

Page({
  handleLogin() {
    wx.getUserInfo({
      withCredentials: false,
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        console.log(res);
        const url = this.options ? this.options.redirectUrl : undefined;
        wx.navigateTo({ url: url || "/pages/index/index" });
      },
    });
  },
});
