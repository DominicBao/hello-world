// pages/xuanj/xuanj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xs:false,
    sjm:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var x = 0;
    var str = "";
    for(var i = 0;i < 9;i++){
      x = parseInt(Math.random()*10);
      x=x+"";
      str+=x;
      if((i+1)%3==0&&i!=8){
        str+="-";
      }
    }
    this.setData({
      sjm:str
    })


  },
  xianc: function () {
    var that = this;
    that.setData({
        xs:(!that.data.xs)
    })
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
        for (var i = 0; i < res.data[0].id1.length; i++) {
          if (e.detail.value["tpid"] == res.data[0].id1[i]) {
            var str = "/pages/chapiao/chapiao?id=" + res.data[0].id1[i];
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

  creamt:function(e){
    console.log(e.detail.value["touip"] + "/" + e.detail.value["toun"]+"/");
    console.log(e.detail.value["toup"] + "/" + e.detail.value["touname"] + "/");
    var people = new Array;
    people = e.detail.value["touname"].split("，");
    const db = wx.cloud.database()
    db.collection('IDbiao').add({
      data: {
        id: e.detail.value["touip"],
        name: e.detail.value["toun"],
        number:e.detail.value["toup"],
        people: people,
        piao:[0,0,0,0,0,0]
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })

    const _ = db.command
    db.collection('IDbiao').doc("XBZgdnffS3SWDAJ1").update({
      data: {
        id1:_.push(e.detail.value["touip"])
      },
      success: res => {
        wx.showToast({
          title: "创建成功",
          icon: "success",
          duration: 2000
        });
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/zhuye/zhuye',
          })
        }, 2000)
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
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