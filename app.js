//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

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
  },
  globalData: {
    userInfo: null,

  },

  // checkPostData:function(){
  //   wx.login({//login流程
  //     success: function (res) {//登录成功
  //       if (res.code) {
  //         var code = res.code;
  //         wx.request({
  //           url: 'https://cyy.yitong111.com/frontend/web/index.php?r=site/get-token&id=1&code=' + res.code,
  //           header: {
  //             'content-type': 'application/json'
  //           },
  //           success: function (res) {
  //             wx.setStorageSync('openId', res.data.openid);
  //           }
  //         }),

          

  //           wx.getUserInfo({//getUserInfo流程
  //             success: function (res2) {//获取userinfo成功
  //               //创建一个dialog
  //               wx.showToast({
  //                 title: '正在登录...',
  //                 icon: 'loading',
  //                 duration: 10000
  //               });
  //               var userInfo = JSON.parse(res2.rawData);
  //               userInfo.openId = wx.getStorageSync('openId');
  //               //检查用户是否已报名
  //               wx.request({
  //                 url: 'https://cyy.yitong111.com/frontend/web/index.php?r=site/check&small=1',
  //                 method: "POST",
  //                 data: {
  //                   openId: userInfo.openId,
  //                 },
  //                 header: {
  //                   'content-type': 'application/x-www-form-urlencoded'
  //                 },
  //                 success: function (res) {
  //                   wx.setStorageSync('errorCode', res.data.errorCode);
  //                 },
  //                 fail: function (res) {
  //                   console.log('发送失败！')
  //                 },
  //                 complete: function (res) {
  //                 }
  //               })
  //             },
  //             fail: function () {
  //               //获取用户信息失败后。请跳转授权页面
  //               wx.showModal({
  //                 title: '警告',
  //                 content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
  //                 success: function (res) {
  //                   if (res.confirm) {
  //                     wx.redirectTo({
  //                       url: '../author/author',
  //                     })
  //                   }
  //                 }
  //               })
  //             }
  //           })
  //       } else {
  //         console.log('获取用户登录态失败！' + res.errMsg)
  //       }
  //     }
  //   })
  // }
})