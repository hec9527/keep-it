Page({
  handleClearAll() {
    wx.showModal({
      title: "确认清除?",
      content: "清除缓存会清空用户本地所有打卡信息以及登录信息",
      confirmText: "确认",
      confirmColor: "#df3535",
      cancelColor: "#999",
      cancelText: "取消",
      success(res) {
        if (res.confirm) {
          wx.clearStorage().then(() => {
            wx.reLaunch({ url: "/pages/login/login" });
          });
        }
      },
    });
  },
});
