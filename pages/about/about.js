// pages/about/about.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    userInfo:{},//用户信息
  },
  // 点击按钮，获取用户信息
  getUserInfo(e){
    wx.getUserProfile({
      desc: '用于获取用户信息',
      success: res => {
        console.log(res.userInfo);
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          flag:false
        })
      },
      fail: err => {
        console.log("用户拒绝授权");
      }
    })
  },
  // 获取头像并登录
  getUserInfo2(){
    wx.getUserProfile({
      desc: '用于获取用户信息',
      success: res => {
        console.log(res.userInfo);
        this.setData({
          userInfo: res.userInfo,
          flag:false
        })
      },
      fail: err => {
        console.log("用户拒绝授权");
      }
    });
    // 登录--1.1
    wx.login({
      success: res => {
        console.log(res.code);
        // 1.2通过code发送给后台
        wx.request({
          url: 'url',//后台给的接口，code换取openid session_key
          data: {
            "":res.code
          },
          success: result => {
            console.log(result.data);
            // 存储本地 openid
            wx.setStorageSync('openid', result.data.openid);
            // 1.3小程序自定义登录状态--后代接口
            wx.request({
              url: 'url',
              data:{
                openid:result.data.openid
              },
              success: res => {
                console.log(res.data);
              }
            })

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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.globalData.userInfo!=""){
      this.setData({
        flag:false
      })
    }
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