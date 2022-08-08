/**
 * 封装网络请求
 * @param {String} method 请求方式
 * @param {String} url 请求地址
 * @param {object} params 参数
 * @param {String} message 展示loading
 * @param {Function} callBack 成功回调函数
 * @param {Function} error 错误回调函数
 */
function http(method, url, params, message, callBack, error) {
  // 展示loading
  if (message) {
    wx.showLoading({
      title: 'message',
    })
  }
  // 网络请求
  wx.request({
    url: "http://iwenwiki.com:3002" + url,
    method: method,
    data: params,
    success: res => {
      if (res.data.status === 200) {
        // 返回数据
        callBack(res.data)
      } else {
        error("没有数据")
      }
    },
    fail: err => {
      error("请求失败");
    },
    complete: () => {
      wx.hideLoading();
    }
  })
}

module.exports = http;
// module.exports = {
//   http
// }