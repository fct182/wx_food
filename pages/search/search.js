// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData: [],
    msg: false
  },
  // 搜索事件
  searchHandle(e) {
    // 获取输入的内容
    const value = e.detail.value;
    if (value) {
      wx.request({
        url: 'http://iwenwiki.com:3002/api/foods/select',
        data: {
          name: value,
          city: ""
        },
        success: (res) => {
          if (res.data.status === 200) {
            this.setData({
              searchData: res.data.data,
              msg: false
            })
          } else {
            this.setData({
              msg: true
            })
          }
        }
      })
    } else {
      this.setData({
        searchData: [],
        msg: false
      })
    }
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