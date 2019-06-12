// pages/weizhi/weizhi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heng: '121.55084',
    zong: '29.85957',
    markers: [{
      //iconPath: "../../image/gongju.png",
      id: 0,
      latitude: 40.002607,
      longitude: 116.487847,
      width: 35,
      height: 45
    }],
    id : " "
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var yi = "markers[" + 0 + "].latitude"
    var er = "markers[" + 0 + "].longitude"
    var heng1;
    var zong1;
    var name;
    //获取用户位置
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        heng1 = res.latitude
        zong1 = res.longitude
        //console.log(heng1)
        //console.log("zong"+zong1)
        //const speed = res.speed
        //const accuracy = res.accuracy
        that.setData({
          [yi]: heng1,
          [er]: zong1,
          heng:zong1,
          zong:heng1
          //[er]: zong1
        })
        //console.log(heng1)
        //获取用户信息
        wx.getUserInfo({
          success(res) {
            name = res.userInfo.nickName
            //console.log(name)数据库操作
            setInterval(function () {
            if(name == '缓步安歌'){
              //数据库查操作
              const db = wx.cloud.database()
              db.collection('Location').where({
                name: 'Dominic'
              }).get({
                success: res => {
                  that.setData({
                    [yi]: res.data[0].jing,
                    [er]: res.data[0].wei
                  })
                  //id = _id
                  console.log('[数据库] [查询记录] 成功: ', res)
                },
                fail: err => {
                  wx.showToast({
                    icon: 'none',
                    title: '查询记录失败'
                  })
                  console.error('[数据库] [查询记录] 失败：', err)
                }
              })

              //console.log(id)
              //数据库更新操作
              db.collection('Location').doc('XG1FbnffS3SWkCvY').update({
                data: {
                  jing: heng1,
                  wei: zong1
                },
                success: res => {
                  this.setData({
                    jing: heng1,
                    wei: zong1
                  })
                  console.log("数据库更新成功")
                },
                fail: err => {
                  icon: 'none',
                    console.error('[数据库] [更新记录] 失败：', err)
                }
              })
            //另一个人操作，原理同上
            } else if (name == 'Dominic') {
              
              const db = wx.cloud.database()
              db.collection('Location').where({
                name: '缓步安歌'
              }).get({
                success: res => {
                  //console.log(res.data[0].jing)
                  that.setData({
                    [yi]: res.data[0].jing,
                    [er]: res.data[0].wei
                    //id:_id
                  })
                  console.log('[数据库] [查询记录] 成功: ', res)
                },
                fail: err => {
                  wx.showToast({
                    icon: 'none',
                    title: '查询记录失败'
                  })
                  console.error('[数据库] [查询记录] 失败：', err)
                }
              })

              db.collection('Location').doc('XGt_S5T75u22BTwb').update({
                data: {
                  jing: heng1,
                  wei: zong1
                },
                success: res => {
                  this.setData({
                    jing: heng1,
                    wei: zong1
                  })
                  console.log("数据库更新成功")
                },
                fail: err => {
                  icon: 'none',
                    console.error('[数据库] [更新记录] 失败：', err)
                }
              })
            }
            console.log('sss')
            }, 10000)


            /*const db = wx.cloud.database()
            
            db.collection('Location').add({
              data: {
                name: name,
                jing:heng1,
                wei:zong1
              },
              success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                this.setData({
                  counterId: res._id,
                  name: name,
                  jing: heng1,
                  wei: zong1
                })
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

          },
          fail:err =>{
            wx.showToast({
              icon: 'none',
              title: '访问失败'
            })
          }
        })
      }
    })
    
    
    /*const db = wx.cloud.database()
    db.collection('Location').add({
      data: {
        name: name
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          name: name
        })
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
  },
  //权限操作界面
  gotoSetting() {
    wx.openSetting({
      success: (res) => {
        console.log(res)
      }
    })
  },
  //获取位置测试
  wei(){
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        const heng2 = res.latitude
        const zong2 = res.longitude
        console.log(heng2)

      },
      fail:res=>{
        wx.showToast({
          icon: 'none',
          title: '访问失败'
        })
      }
    })
  },
  //取得位置权限
  onAuthLocation() {
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {
        console.log('成功：', res)
        wx.showToast({
          icon: 'none',
          title: '访问成功'
        })
      },
      fail: (res) => {
        console.log('失败：', res)
        wx.showToast({
          icon: 'none',
          title: '访问失败'
        })
      },
    })
  },
  //加入新成员入数据库
  ruku(){
    var that = this;
    var heng1;
    var zong1;
    var name;
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        heng1 = res.latitude
        zong1 = res.longitude
        //console.log(heng1)
        //console.log("zong"+zong1)
        //const speed = res.speed
        //const accuracy = res.accuracy
        wx.getUserInfo({
          success(res) {
            name = res.userInfo.nickName
            //console.log(name)数据库操作


            const db = wx.cloud.database()

            db.collection('Location').add({
              data: {
                name: name,
                jing: heng1,
                wei: zong1
              },
              success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                this.setData({
                  counterId: res._id,
                  name: name,
                  jing: heng1,
                  wei: zong1
                })
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
            })

          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '访问失败'
            })
          }
        })
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