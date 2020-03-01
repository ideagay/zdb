const config = require('./config.js');
//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const { code } = res;
        if (code) {
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  withCredentials: true,
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    const that = this;
                    const { encryptedData, iv, userInfo } = res; 
                    wx.setStorageSync('userInfo', userInfo);
                    that.globalData.userInfo = userInfo;
                    wx.request({
                      method: 'POST',
                      url: `${config.apiUrl}/wxlogin`,
                      data: {
                        encryptedData,
                        iv,
                        code,
                        userInfo
                      },
                      success: function (res) {
                        if (res.statusCode === 200) {
                          console.log(res.data.data);
                          wx.setStorageSync('userInfo', res.data.data || userInfo);
                          that.globalData.userInfo = res.data.data || userInfo;
                        }
                      },
                      fail: function(res) {
                        wx.showToast({
                          title: '网络请求失败',
                        })
                      }
                    })
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userInfoReadyCallback) {
                      this.userInfoReadyCallback(res)
                    }
                  }
                })
              }
            }
          })
        } else {
          console.log('登录失败');
        }
      }
    })
  },
  globalData: {
    userInfo: wx.getStorageSync('userInfo') || {}
  }
})