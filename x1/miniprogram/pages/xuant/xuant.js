// pages/xuant/xuant.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },
  formBindsubmit: function (e) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('IDbiao').where({
      _id: 'XBZgdnffS3SWDAJ1'
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        for (var i = 0; i < res.data[0].id1.length;i++){
          if (e.detail.value["tpid"] == res.data[0].id1[i]){
            var str = "/pages/jipiao/jipiao?id=" + res.data[0].id1[i];
            console.log(str);
            wx.showToast({
              title: "登陆成功",
              icon: "success",
              duration: 3000
            });
            setTimeout(function () {
              wx.navigateTo({
                url: str,
                
              })
            }, 2000)
            
          }
        }
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    //db.collection('IDbiao').doc('XBXmUuSiwXKAQm3Z').get({
    //  success(res) {
        // res.data 包含该记录的数据
    //    sum = res.data.sum;
    //  }
    //})
    //e.detail.value["tpid"]//文本框的值
    wx.showToast({
      title: "请检查你的id",
      icon: "loading",
      duration: 2000
    });
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