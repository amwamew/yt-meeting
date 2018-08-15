//index.js
//获取应用实例
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        filePaths: 'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533884877.jpg'
    },

    //页面跳转
    go: function () {
      console.log('canClick: ' + wx.getStorageSync('canClick'));
      if (wx.getStorageSync('canClick') == 1) {
        wx.navigateTo({
          url: '../message/message',
        });
      }
      return false;
    },

    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
      //判断是否是通过分享进入页面的
      if (options.from == 'share') {
        wx.clearStorage();
        wx.setStorageSync('canClick', 0);
      }
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
    wx.clearStorage();
    wx.setStorageSync('canClick', 0);
     //创建一个dialog
    wx.showToast({
      title: '正在登录...',
      icon: 'loading',
      duration: 2000
    });
   
        
        // console.log(errorCode);
        // console.log('邦本好：1.0.1');
        if (wx.getStorageSync('errorCode') == 10002) {
          wx.setStorageSync('canClick', 1);
          return false
        }
        wx.login({//login流程
          success: function (res) {//登录成功
            if (res.code) {
              var code = res.code;
              wx.request({
                url: 'https://cyy.yitong111.com/frontend/web/index.php?r=site/get-token&id=1&code=' + res.code,
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  // console.log(res.data);
                  wx.setStorageSync('openId', res.data.openid);
                  //getUserInfo流程
                  wx.getUserInfo({
                    success: function (res2) {//获取userinfo成功
                     
                      
                      var userInfo = JSON.parse(res2.rawData);
                      // console.log('----userinfo---');
                      // console.log(userInfo);
                      // console.log('---userinfo---');
                      // userInfo.openId = wx.getStorageSync('openId');
                      // console.log('From storage: ' + wx.getStorageSync('openId'));
                      //检查用户是否已报名
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
                          console.log(res.data, wx.getStorageSync('openId'));
                          wx.setStorageSync('errorCode', res.data.errorCode);
                          if (wx.getStorageSync('errorCode') == 10000) {
                            wx.request({
                              url: 'https://cyy.yitong111.com/frontend/web/index.php?r=site/save-user-info&small=1',
                              method: "POST",
                              data: userInfo,
                              header: {
                                'content-type': 'application/x-www-form-urlencoded'
                              },
                              success: function (res) {
                                wx.setStorageSync('canClick', 1);
                                // console.log(userInfo)
                                // console.log(res.data)
                              }
                            })
                          }else{
                            wx.setStorageSync('canClick', 1);
                          }
                        },
                        fail: function (res) {
                          console.log('发送失败！')
                        },
                        complete: function (res) {
                        }
                      })
                    },
                    fail: function () {
                      //获取用户信息失败后。请跳转授权页面
                      wx.showModal({
                        title: '警告',
                        content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
                        success: function (res) {
                          if (res.confirm) {
                            wx.redirectTo({
                              url: '../author/author',
                            })
                          }
                        }
                      })
                    }
                  })
                }
              })    
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
     
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
    onShareAppMessage: function (res) {
        
    }
})
