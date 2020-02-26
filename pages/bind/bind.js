// pages/bind/bind.js
const config = require('../../config.js');
var app = getApp();
var hasClick = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    loading: false
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  bindCodeTap: function() {
    if (hasClick) {
      return;
    }
    const pid = this.data.inputValue;
    if (!pid) {
      return wx.showToast({
        title: '请先输入会员码',
        icon: 'none'
      });
    }
    hasClick = true;
    wx.showLoading();
    const { openId, token } = app.globalData.userInfo;
    wx.request({
      method: 'POST',
      url: `${config.apiUrl}/bindPid`,
      data: {
        pid,
        openId,
        token
      },
      success: function(res) {
        console.log(res);
        if (res.statusCode === 200) {
          wx.showToast({
            title: '恭喜你成功开通店长',
            icon: 'success',
            duration: 3000,
            success: function() {
              wx.switchTab({ url: '../rights/rights'});
            }
          });
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message || '服务器异常'
          });
        }
      },
      fail: function(res) {
        console.log(res);
        wx.showToast({
          title: '服务器异常',
          icon: 'none'
        });
      },
      complete: function (res) {
        wx.hideLoading();
        hasClick = false;
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})