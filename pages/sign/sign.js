Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    jump:function(){
        wx.redirectTo({
            url: '../index/index',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        wx.request({
            url: 'https://cyy.yitong111.com/frontend/web/index.php?r=site/sign-in&small=1',
            method:'POST',
            data:{
              openId: wx.getStorageSync('openId')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success:function(res){
                console.log(res.data);
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      // 转发页面判断本地缓存是否有值，无，调回首页
      var user = wx.getStorageSync('errorCode');
      console.log(user);
      if (!user) {
        wx.redirectTo({
          url: '../index/index',
        })
      }
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
    }
})