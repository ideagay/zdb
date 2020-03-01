//index.js
//获取应用实例
const app = getApp()

console.log(app.globalData.userInfo.pid);

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  applyTap: function() {
    wx.navigateTo({
      url: '../apply/apply'
    })
  },
  shareTap: function () {
    wx.navigateTo({
      url: '../share/share'
    })
  },
  hongbaoTap: function () {
    wx.navigateTo({
      url: '../hongbao/hongbao'
    })
  },
  onLoad: function () {
    this.setData({
      nbTitle: '赚点呗',
      nbLoading: true,
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000',
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    // }
    console.log(res);
    return {
      title: "这个小程序真好",
      path: '/pages/apply/apply?invitionCode=123' + app.globalData.userInfo.pid
    }
  }
})
