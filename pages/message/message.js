
const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var demo = new QQMapWX({
    key: 'DZBBZ-3QF64-W3FUY-XDHXN-YBUSJ-R5FFB' // 必填
});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollWidth:'',
        scrollHeight:'',
        tempFilePaths: 'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533884897.jpg',
        title:'医统天下·云谷产业园揭幕典礼',
        address:'马鞍山市花山区榕基云谷电子商务产业园1号楼',
        time:'2018-08-26 09:00 - 2018-08-27 16:00',
        hasLocation: false,
        btnText:'我要报名',
        disabled:false,
        header:'活动内容',
        contents:[
        {txt: ' 随着两票制的落地和执行，医药流通产业链在重构、流通秩序在规范、企业的运营流程在改变。在这场变革中，厂商的财务处理能力、营销模式、与经销商的关系等方面，都将面临颠覆性的变化。'},{txt: ' 时逢医统天下·云谷产业园揭幕之际，我们盛邀业内精英讲述他们在这场变革中的切身体会。'},{txt: ' 政府主管部门、互联网服务商、医药行业协会、知名制药企业、医药经销商共同探讨医药供应链互联网化的应用与落地。'}],
guest:'嘉宾信息',
    logos:[
{image:'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533883401.png',name:'冯立欣',company:'医统天下',jobs:'董事长'},{image:'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533883470.png',name:'张安妮',company:'医统天下',jobs:'CEO'},{image:'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533883665.png',name:'甘靖',company:'中国云谷',jobs:'高级副总裁'},{image:'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533883744.png',name:'秦田',company:'云谷新城',jobs:'副总裁'},{image:'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533883817.png',name:'谭继龙',company:'榕基软件',jobs:'分公司总经理'},{image:'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533883883.png',name:'张玉新',company:'原河南食药监局',jobs:'副局长'},{image:'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533883945.png',name:'张启镇',company:'原河南食药监局',jobs:'副局长'},{image:'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533884022.png',name:'赵卫东',company:'医药质管协会',jobs:'会长'},{image:'https://cyy.yitong111.com/backend/web/uploads/2018/08/10/1533884092.png',name:'郭亚洲',company:'医药物资协会',jobs:'秘书长'}],
top:'会议议程',
    listData:{"2018-08-26":{"children":[{"date":"09:00 - 18:00","content":"\u5168\u5929\u89c4\u5212"}],"time":"2018-08-26","ishaveChild":"true"},"2018-08-27":{"children":[{"date":"09:00 - 10:30","content":"\u53c2\u89c2\u53ca\u526a\u5f69\u4eea\u5f0f"},{"date":"10:40 - 12:10","content":"\u6b63\u5f0f\u4f1a\u8bae"},{"date":"12:10 - 13:10","content":"\u5348\u9910"},{"date":"13:20 - 18:00","content":"\u8fd4\u7a0b"}],"time":"2018-08-27","ishaveChild":"true"}},
    you: true,
    zhidao:'相关单位',
    zhidaoData:{"\u4e3b\u529e\u5355\u4f4d":{"companys":[{"name":"\u533b\u7edf\u5929\u4e0b(\u5317\u4eac)\u7f51\u7edc\u79d1\u6280\u6709\u9650\u516c\u53f8"}],"infor":"\u4e3b\u529e\u5355\u4f4d"},"\u652f\u6301\u5355\u4f4d":{"companys":[{"name":"\u77f3\u836f\u96c6\u56e2\u6709\u9650\u516c\u53f8"},{"name":"\u534e\u5317\u5236\u836f\u96c6\u56e2\u6709\u9650\u8d23\u4efb\u516c\u53f8"}],"infor":"\u652f\u6301\u5355\u4f4d"}}},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function () {
   let that = this;
   wx.getSystemInfo({
     success: function(res) {
       that.setData({
         scrollHeight: parseInt(res.windowHeight) + 600       
       })
     },
   });
 var  qqmapsdk = new QQMapWX({
        key: 'DZBBZ-3QF64-W3FUY-XDHXN-YBUSJ-R5FFB'
    });
  
},


/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {
  var that = this;
  // console.log(wx.getStorageSync('msg'));
  // console.log(wx.getStorageSync('errorCode'));
  if (wx.getStorageSync('errorCode') == 10002 || wx.getStorageSync('msg')=='success' ) {
        that.setData({
            btnText: '已报名',
            disabled: true
        })
    } else {
        that.setData({
            btnText: '我要报名'
        })
    }





},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {
  
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
    success:function(){
    }
  }
},

reg:function(){
    wx.navigateTo({
        url: '../regist/regist',
    })
},

//根据地址获取经纬度在地图上显示
openLocation: function (){
    var ad = this.data.address;
    demo.geocoder({
        address: ad ,
        success: function (res) {
            wx.openLocation({
                latitude: res.result.location.lat,
                longitude: res.result.location.lng,
                scale: 28
            })
        },
        fail: function (res) {

        },
        complete: function (res) {

        }
    })
}
})