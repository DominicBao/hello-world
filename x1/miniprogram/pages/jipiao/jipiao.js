// pages/jipiao/jipiao.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"XXXXXXX投票大会",
    people:"",
    piaoshu:"",
    number:"",
    yp:"",
    key:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var id = options.id;
    console.log(id);
    var people = new Array;
    var number = 0;

    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('IDbiao').where({
      id: id
    }).get({
      success: res => {
        this.setData({
          name: res.data[0].name,
          number: res.data[0].number,
          yp: res.data[0].piao,
          key: res.data[0]._id,
        })
        people = res.data[0].people;
        number = res.data[0].number;
        /*for (var i = 0; i < res.data[0].id1.length; i++) {
          if (e.detail.value["tpid"] == res.data[0].id1[i]) {
            wx.showToast({
              title: "登陆成功",
              icon: "success",
              duration: 3000
            });
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/jipiao/jipiao?id=' + res.data[0].id1[i],
              })
            }, 2000)

          }
        }*/
        
        var piao = new Array;
        for (var i = 0; i < people.length; i++) {
          piao[i] = 0;
        }
        this.setData({
          people: people,
          piaoshu:piao,
        })
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })


  },
  addpiao: function (e) {
    var that = this;
    var n = that.data.number;
    var n1 = 1;

    var x = e.currentTarget.id;
    var p = new Array;
    p = that.data.piaoshu;
    if(n > 0){
      if(p[x] < 1){
        p[x] = that.data.piaoshu[x] + 1;
        n = n - 1;
      }else{
        wx.showToast({
          title: "只能投一票哦",
          duration: 2000
        });
      }
    }else{
      wx.showToast({
        title: "投票超出限制",
        duration: 2000
      });
    }
    
    this.setData({
      piaoshu: p,
      number:n,
    })
  },

  mupiao: function (e) {
    var that = this;
    var n = that.data.number;
    var n1 = 1;

    var x = e.currentTarget.id;
    var p = new Array;
    p = that.data.piaoshu;
    if (n => 0) {
      if (p[x] > 0) {
        p[x] = that.data.piaoshu[x] - 1;
        n = n + 1;
      } else {
        wx.showToast({
          title: "不能再减了哦",
          duration: 2000
        });
      }
    } else {
      wx.showToast({
        title: "系统出错",
        duration: 2000
      });
    }

    this.setData({
      piaoshu: p,
      number: n,
    })
  },
  
  ti: function (e) {
    var that = this;
    var y = new Array;
    var p = new Array;
    y = that.data.yp;
    p = that.data.piaoshu;
    for(var i = 0;i < y.length;i++){
      y[i] = y[i] + p[i];
    }

    const db = wx.cloud.database()
    db.collection('IDbiao').doc(that.data.key).update({
      data: {
        piao: y
      },
      success: res => {
        wx.showToast({
          title: "投票成功",
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