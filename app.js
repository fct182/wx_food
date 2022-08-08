// app.js
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 判断之前是否授权过获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res.authSetting);
        if(res.authSetting["scope.userInfo"]){
          console.log("已授权");
        }else{
          console.log("没授权");
        }
      },
    });
    // 2. 判断之前是否登录过
    const openid = wx.getStorageSync('openid');
    if(openid){//存在
      // 直接登录
      wx.request({
        url: 'url',
        data:{
          openid
        },
        success: res => {
          console.log(res.data);
        }
      })
    }else{
      // 之前没有授权登录----引导登录
      // wx.switchTab({
      //   url: 'pages/about/about',
      // })
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData:{
    userInfo:""
  }
})

