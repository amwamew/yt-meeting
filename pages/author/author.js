const app = getApp()

Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        filePaths:'../../image/logo.png',
        items: [
            { name: 'CHN', value: '获取你的公开信息（昵称，头像等）', checked: 'true' }
        ]
    },
    onLoad: function () {
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res.userInfo, 222)
                        },
                        fail: function (e) {
                            console.log(e, 333)
                        }
                    })
                }
            }
        })
    },
    bindGetUserInfo: function (e) {
        var that = this;
        if (e.detail.userInfo) {
            wx.login({
                success: function (res) {
                    var userInfo = e.detail.userInfo;
                    userInfo.openId = wx.getStorageSync('openId');
                        wx.request({
                            url: 'https://cyy.yitong111.com/frontend/web/index.php?r=site/check&small=1',
                            method: "POST",
                            data: {
                              openId: wx.getStorageSync('openId'),
                            },
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res) {
                              console.log(res.data);
                                wx.setStorageSync('errorCode', res.data.errorCode);
                              if (wx.getStorageSync('errorCode') == 10000){
                                wx.request({
                                  url: 'https://cyy.yitong111.com/frontend/web/index.php?r=site/save-user-info&small=1',
                                  method: "POST",
                                  data: userInfo,
                                  header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                  },
                                  success: function (res) {
                                      console.log(res.data)
                                  }
                                })
                              } else if (wx.getStorageSync('errorCode') == 10001){
                                   wx.showModal({
                                     title: '提示',
                                     content: '提交的参数错误！',
                                   })
                              }
                            },  
                        }),
                        wx.redirectTo({
                            url: '../index/index',
                        })
                }
            });
        } else {
            console.log(333, '执行到这里，说明拒绝了授权')
            wx.showToast({
                title: "为了您更好的体验,请先同意授权",
                icon: 'none',
                duration: 2000
            });
        }
        // console.log(e.detail.userInfo,111)
    }
})




