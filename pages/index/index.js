import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    result: [],
    topList: []
  },


  headers(){
    wx.navigateTo({
      url: "/songs/pages/recommendSong/recommendSong"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    req("/banner", { type: "2" }, "GET").then(({ banners}) => {
      this.setData({
        banners
      })
    })

    req("/personalized",{} ,"GET").then(({ result}) => {
      this.setData({
          result
        })
    })

    const topList = []
    
    const arr = [2,6,8,12];

    let index = 0

    while(index < arr.length){
      let topData = req("/top/list", { idx: arr[index++] }, "GET")
      topData.then(({ playlist}) => {
        let { id, name, tracks } = playlist

        tracks = tracks.slice(0,3)
        topList.push({
          id,name,tracks
        })

        this.setData({
          topList
        })
        console.log(topList)
      })
    }
 
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