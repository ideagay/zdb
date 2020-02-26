//index.js
//获取应用实例
const app = getApp()

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
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/pages/logs?id=123'
    }
  }
})
