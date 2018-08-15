Page({

    /**
     * 页面的初始数据
     */
    data: {
        filePaths:'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533884912.jpg',
        name: '',
        tel: ''
    },

    //获取用户输入的用户名和手机号
    userNameInput: function (e) {
        this.setData({
            name: e.detail.value,
        });

    },
    mobileInput: function (e) {
        this.setData({
            tel: e.detail.value
        })
    },

    //提交用户名和手机号到后台
    loginBtnClick: function () {
        //判断手机号和姓名
        var name = this.data.name;
        var tel = this.data.tel;
        var userName = /^[u4E00-u9FA5]+$/;
        var regNum = new RegExp('[0-9]', 'g');
        var rsNum = regNum.exec(name);
        if (name == '' || rsNum != null) {
            wx.showToast({
                title: '用户名有误',
                icon: 'succes',
                duration: 1000,
                mask: true
            })
            return false
        } else if (tel == 0) {
            wx.showToast({
                title: '手机号不能为空',
            })

            return false
        }
        else if (tel.length != 11) {
            wx.showToast({
                title: '手机号有误！',
                icon: 'success',
                duration: 1000
            })
            return false;
        }

        var myreg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
        if (!myreg.test(tel)) {
            wx.showToast({
                title: '手机号有误！',
                icon: 'success',
                duration: 1500
            })
            return false;
        }

        //提交手机号和姓名到后台报名
        wx.request({
            url: 'https://cyy.yitong111.com/frontend/web/index.php?r=site/sign&small=1',
            method: "POST",
            data: {
                name: name,
                tel: tel,
                openId: wx.getStorageSync('openId')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                // console.log(res.data);
                wx.setStorageSync('msg', res.data.msg);
                wx.showModal({
                    title: '提示',
                    content: '报名成功，等待审核',
                    showCancel:false,
                    success: function (res) {
                        if (res.confirm) {
                          setTimeout(function(){
                            wx.redirectTo({
                              url: '../message/message',
                            })
                          },2000)
                           
                        } else if (res.cancel) {
                            console.log('取消')
                        }
                    }
                })
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
      // 转发页面判断本地缓存是否有值，无，调回首页
      // var user = wx.getStorageSync('errorCode');
      // console.log(user);
      // if (!user) {
      //   wx.redirectTo({
      //     url: '../index/index',
      //   })
      // }
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
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '医统天下会务系统',
        path: '/pages/index/index?from=share',
        success: function () {
        }
      }
    },

})