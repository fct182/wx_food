// pages/city/city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCity: []
  },
  getLocation() {
    // 定位服务
    wx.getLocation({
      success: (res) => {
        // console.log(res); //获取经纬度
        wx.request({
          url: 'http://iwenwiki.com:3002/api/lbs/location',
          data: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: (result) => {
            let cityName = result.data.result.address_component.city.slice(0, 2);
            // 传递参数and跳转页面
            // wx.reLaunch({
            //   url: `../food/food?city=${cityName}`,
            // })
            // 本地存储
            wx.setStorageSync('cityName', cityName);
            wx.switchTab({
              url: '../food/food',
            })
          }
        })
      }
    })
  },
  selectCity(e) {
    // 切换热门城市
    wx.setStorageSync('cityName', e.currentTarget.dataset.city);
    wx.switchTab({
      url: '../food/food',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.获取热门城市
    wx.request({
      url: 'http://iwenwiki.com:3002/api/hot/city',
      success: res => {
        // console.log(res.data);
        this.setData({
          hotCity: res.data.data
        })
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