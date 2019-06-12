// pages/zhuye/zhuye.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: '欢迎你',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goto: function () {
    wx.navigateTo({
      url: '/pages/xuanj/xuanj',
    })
  },
  goto1: function () {
    wx.navigateTo({
      url: '/pages/xuant/xuant',
    })
  },
  goto2: function () {
    wx.navigateTo({
      url: '/pages/weizhi/weizhi',
    })
  },
  onLoad: function () {
    /*const db = wx.cloud.database()
    db.collection('IDbiao').add({
      data: {
        id:"456-789-123",
        name:"人气王评比投票大会",
        number:3,
        people: ["小一", "小二", "小孩", "小猫", "小狗", "小朱"],
        piao:[0,0,0,0,0,0]
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })*/


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})