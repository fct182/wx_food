// pages/myCart/myCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSeletedAll: false, //是否全选中
    x1: "", //开始x坐标
    x2: "", //移动后x坐标
    cartData: [],
    selectedNum: 0,
    totalPrice: "0.00",
    selectedArr: []
  },
  // 删除商品
  deleteProduct(e) {
    const index = e.currentTarget.dataset.index;
    let cartData = this.data.cartData;
    let id = cartData[index].id;
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/delete',
      data: {
        id
      },
      success: (res) => {
        // console.log(res.data);
        if (res.data.status === 200) {
          wx.showToast({
            title: '删除成功!'
          });
          // 本地删除
          cartData.splice(index, 1);
          this.setData({
            cartData
          });
          // 获取价格
          this.countPrice();
        } else {
          wx.showToast({
            title: '删除失败',
            icon: "error"
          })
        }
      }
    });
  },
  // 计算价格
  countPrice() {
    const cartData = this.data.cartData;
    let sum = 0;
    // 遍历数据
    for (let i = 0; i < cartData.length; i++) {
      if (cartData[i].isSelected) {
        sum += cartData[i].price * cartData[i].num
      }
    }
    this.setData({
      totalPrice: sum.toFixed(2)
    })
  },
  // 点击选中商品
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let cartData = this.data.cartData;
    cartData[index].isSelected = !cartData[index].isSelected;
    // 判断是否点击商品
    if (cartData[index].isSelected) {
      let selectedArr = this.data.selectedArr;
      selectedArr.push(index);
      this.setData({
        selectedNum: ++this.data.selectedNum,
        selectedArr: selectedArr
      });
    } else {
      let selectedArr = this.data.selectedArr;
      let xb = selectedArr.indexOf(index);
      selectedArr.splice(xb, 1);
      this.setData({
        selectedNum: --this.data.selectedNum,
        selectedArr
      })
    }
    // 判断是否全选了所有商品
    if (this.data.selectedNum == cartData.length) {
      this.setData({
        isSeletedAll: true
      });
    } else {
      this.setData({
        isSeletedAll: false
      });
    }
    // 调用计算价格
    this.countPrice();
    this.setData({
      cartData
    });
  },
  // 选中全部商品(全选按钮)
  seletedAll() {
    let cartData = this.data.cartData;
    // 判断现在所相处情况
    if (this.data.selectedNum == cartData.length) { //已经全选-->变一个不选
      this.setData({
        isSeletedAll: false,
        selectedNum: 0,
        totalPrice: "0.00",
        selectedArr: []
      });
      for (let i = 0; i < cartData.length; i++) {
        cartData[i].isSelected = false
      }
    } else { //非全选--->变全选
      let selectedArr = [];
      for (let i = 0; i < cartData.length; i++) {
        cartData[i].isSelected = true;
        selectedArr.push(i);
      }
      this.setData({
        isSeletedAll: true,
        selectedNum: cartData.length,
        selectedArr
      });
      // 计算价格
      this.countPrice();
    }
    this.setData({
      cartData
    });
  },
  // 触发--触摸点击事件
  touchStart(e) {
    this.setData({
      x1: e.touches[0].clientX
    });
  },
  // 触发--触摸滑动事件
  touchMove(e) {
    this.setData({
      x2: e.touches[0].clientX
    });
    const index = e.currentTarget.dataset.index;
    let cartData = this.data.cartData;
    // 判断左滑 or 右滑
    if (this.data.x2 < this.data.x1) {
      // 设置当前滑动元素显示----删除
      cartData[index].active = true;
    } else {
      // 隐藏删除
      cartData[index].active = false;
    }
    this.setData({
      cartData
    })
  },
  // 获取购物车商品
  getCartProduct() {
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/list',
      success: (res) => {
        if (res.data.status === 200) {
          // 加载购物车数据
          this.setData({
            cartData: res.data.data.result
          });
          let cartData = this.data.cartData;
          if (this.data.isSeletedAll) { //判断上次商品是否全选
            for (let i = 0; i < cartData.length; i++) {
              cartData[i].isSelected = true;
            }
            this.setData({
              cartData
            });
          } else { //记录上次个别商品选中
            let selectedArr = this.data.selectedArr;
            for (let i = 0; i < selectedArr.length; i++) {
              const index = selectedArr[i];
              cartData[index].isSelected = true;
            }
            this.setData({
              cartData
            });
          }
        } else {
          this.setData({
            cartData: []
          })
        }
      }
    })
  },
  // 更改商品数量
  changeNum(e) {
    const index = e.currentTarget.dataset.index;
    let cartData = this.data.cartData;
    if (e.currentTarget.dataset.value == "reduce") { //当前为减
      if (cartData[index].num > 1) {
        cartData[index].num--;
      } else {
        wx.showToast({
          title: '数量最少为1',
          icon: "none"
        })
        return;
      }
    } else { //当前为加
      cartData[index].num++;
    }
    // 提交到后台
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/update',
      data: {
        id: cartData[index].id,
        num: cartData[index].num
      },
      success: (res) => {
        if (res.data.status === 200) {
          this.setData({
            cartData
          })
        } else {
          console.log("物品数量添加失败！");
        }
      }
    })

  },
  // 结算(支付)
  toBuy(){
    // 1.判断是否已经授权登录 2.调用购买接口
    /*let user = wx.getStorageSync('openId');
    if(user){

    }else{
      wx.switchTab({
        url: '../about/about',
      })
    }*/
    wx.request({
      method:"post",
      url: 'http://iwenwiki.com:3002/api/buy',
      data: {
        user:"qq",
        id:"123"
      },
      header:{
        "content-type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res.data);
        if(res.data.status === 200){
          wx.redirectTo({
            url: '../complete/complete',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCartProduct();
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
    this.getCartProduct();
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