// pages/foodDetail/foodDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projoctData: {}
  },
  // 加入购物车
  addCart() {
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/add',
      data: {
        name: this.data.projoctData.name,
        pic: this.data.projoctData.pic,
        num: 1,
        info: this.data.projoctData.description,
        price: this.data.projoctData.price,
      },
      success: (res) => {
        if(res.data.status === 200) {
          wx.showToast({
            title: '成功加入购物车',
            icon: "success"
          })
        }else{
          wx.showToast({
            title: '加入失败',
            icon: "error"
          })
        }
      }
    })
  },
  // 跳转到购物车
  goMyCart(){
    wx.switchTab({
      url: '../myCart/myCart',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list/detail',
      data: {
        id: options.id
      },
      success: res => {
        if (res.data.status === 200) {
          this.setData({
            projoctData: res.data.data[0]
          })
        } else {
          console.log("暂无数据");
        }
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