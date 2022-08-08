// pages/food/food.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: "上海",
    pageNum: 1,
    navBarData: [{
      id: 0,
      imgUrl: "../../images/item1.jpg",
      title: "美容养颜"
    }, {
      id: 1,
      imgUrl: "../../images/item2.jpg",
      title: "保健调养"
    }, {
      id: 2,
      imgUrl: "../../images/item3.jpg",
      title: "补养"
    }, {
      id: 3,
      imgUrl: "../../images/item4.jpg",
      title: "减肥"
    }, {
      id: 4,
      imgUrl: "../../images/item5.jpg",
      title: "母婴"
    }, {
      id: 5,
      imgUrl: "../../images/item6.jpg",
      title: "气节"
    }, {
      id: 6,
      imgUrl: "../../images/item7.jpg",
      title: "常见食疗"
    }, {
      id: 7,
      imgUrl: "../../images/item8.jpg",
      title: "维生素"
    }],
    productList: [],
    msg: false
  },
  // 分类导航跳转
  foodListHandle(e) {
    // console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../foodList/foodList?type=' + e.currentTarget.dataset.type,
    })
  },
  // 获取产品列表信息
  getProductList() {
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data: {
        city: this.data.location,
        page: this.data.pageNum
      },
      success: res => {
        if (res.data.status === 200) {
          this.setData({
            productList: res.data.data.result,
            msg: false
          });
        } else {
          this.setData({
            productList:[],
            msg: true
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初次加载获取城市 
    if (wx.getStorageSync('cityName')) {
      this.setData({
        location: wx.getStorageSync('cityName')
      });
    }
    this.getProductList();
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
    if (wx.getStorageSync('cityName')) {
      // 切换页面读取本地城市数据
      this.setData({
        location: wx.getStorageSync('cityName'),
        pageNum: 1
      });
    }
    this.getProductList();
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
    // console.log("下拉刷新页面");
    // 1.配置JSON文件，允许下拉
    // 2.重新请求数据，替换原有数据
    this.setData({
      pageNum: 1
    });
    this.getProductList();
    // 停止下拉刷新
    // wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("上拉--加载数据");
    // 下拉加载更多数据
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data: {
        city: this.data.location,
        page: ++this.data.pageNum
      },
      success: res => {
        if (res.data.status === 200) {
          const arr = this.data.productList.concat(res.data.data.result);
          this.setData({
            productList: arr
          })
        } else {
          this.setData({
            msg: true
          });
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})