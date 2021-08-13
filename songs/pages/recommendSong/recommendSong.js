import req from '../../../utils/req.js';
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: "--",
    may: "--",
    recommend: [],
    currentIndex: null
  },

  redsong(event){
    const { songid ,index} = event.currentTarget.dataset
    console.log(index)
    console.log(songid)
    this.setData({
      currentIndex:index
    })
    wx.navigateTo({
      url: "/songs/pages/song/song?songid=" + songid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    const date = new Date()
    const day = date.getDate()
    const may = date.getMonth() + 1
    console.log(may)
     this.setData({
       day,
       may
     })

    const reqs = await req('/recommend/songs',{},"GET")
    console.log(reqs)

    this.setData({
      recommend: reqs.recommend
    })


    PubSub.subscribe('switchType', (msg, data) => {
      let { recommend, currentIndex} = this.data
      if (data ==="next"){
        if (currentIndex === recommend.length-1){
          currentIndex = 0
        }else{
          currentIndex += 1
        }
        
     }else{
        if (currentIndex===0){
          currentIndex = recommend.length - 1
        }else{
          currentIndex -=1
        }
       
     }

      const id = recommend[currentIndex].id
      this.setData({
        currentIndex
      })
      PubSub.publish("songid",id)

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