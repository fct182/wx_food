// pages/index/index.js
const http = require("../../utils/http")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentBanner: 1,
    bannerData: [],
    listData: []
  },
  swiperHandle(e) {
    // console.log(e.detail.current);//0 1 2
    this.setData({
      currentBanner: e.detail.current + 1
    });
  },
  goToDetail(e) {
    // 跳转详情页
    // console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: `../indexDetail/indexDetail?id=${e.currentTarget.dataset.id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据拼命加载中',
    })
    // 封装的http请求方法
    http("get", "/api/banner", null, "数据加载中", (res) => {
      // console.log(res.data);
      this.setData({
        bannerData: res.data
      })
    }, (err) => {
      console.log(err);
    });
    // 获取轮播图接口数据（原生）
    // wx.request({
    //   url: 'http://iwenwiki.com:3002/api/banner',
    //   success: (res) => {
    //     if (res.data.status === 200) {
    //       this.setData({
    //         bannerData: res.data.data
    //       })
    //     } else {
    //       console.log("请求数据失败");
    //     }
    //   }
    // });
    // 获取列表信息接口数据
    wx.request({
      url: 'http://iwenwiki.com:3002/api/indexlist',
      success: (res) => {
        // console.log(res.data);
        if (res.data.status === 200) {
          this.setData({
            listData: res.data.data
          });
        }
      },
      complete: () => {
        wx.hideLoading();
      }
    })
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