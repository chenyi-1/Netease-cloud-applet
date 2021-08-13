import req from '../../../utils/req.js';
import PubSub from 'pubsub-js'
import moment from 'moment'
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songdetail:[],
    musicUrl: "",
    isplay: false,
    songid: "",
    time: "00:00",
    speed: "0",
    dtss:""
  },

  //下一首
  nextpreTap(event){
    const { id } = event.currentTarget
    PubSub.publish("switchType",id)
  },



  addEvE(){
    this.backgroundAudioManager.onPlay(() => {
      // console.log('onPlay')

      // 使用小程序唯一的实例，记录当前背景音频管理器音乐的播放状态
      if (appInstance.globalData.audioId === this.data.songid){
        appInstance.globalData.playState = true;

        this.setData({
          isplay: true
        })
      }
    })


    this.backgroundAudioManager.onPlay(() => {
        // console.log('onPlay')
      if (appInstance.globalData.audioId === this.data.songid) {
        // 使用小程序唯一的实例，记录当前背景音频管理器音乐的播放状态
        appInstance.globalData.playState = false;

        this.setData({
          isplay: false
        })
      }
       
    })

    this.backgroundAudioManager.onTimeUpdate(() => {
      let { currentTime, duration } = this.backgroundAudioManager
      const time = moment(currentTime * 1000).format("mm:ss")
      const speed = currentTime / duration * 100
      
      this.setData({
        time,
        speed
      })
    })

    this.backgroundAudioManager.onEnded(() => {
      PubSub.publish("switchType", "next")
    })
  },

  async handlePlay(){

    if (this.data.isplay){
      this.backgroundAudioManager.pause()
      appInstance.globalData.playState = false

    }else{
    
      this.backgroundAudioManager.src =  this.data.musicUrl;
      this.backgroundAudioManager.title =  this.data.songdetail.name;
      appInstance.globalData.audioId = this.data.songid
      appInstance.globalData.playState = true
      
    }
  
    this.setData({
      isplay: !this.data.isplay
    })

  },

  async getqusc(){
    const songId = await req('/song/detail', { ids: this.data.songid }, 'GET')
    
    const songdetail = songId.songs[0]
    let { dt } = songdetail
    const dtss = moment(dt).format("mm:ss")
    wx.setNavigationBarTitle({
      title: songdetail.name
    });

    this.setData({
      songdetail,
      dtss
    })
  },


  async getUrl(){
    const songUrl = await req("/song/url", { id: this.data.songid }, "GET")
    console.log(songUrl)
  
    this.setData({
      musicUrl: songUrl.data[0].url,

    });
  },

  async getSongId(msg, songid){
    this.setData({
      songid
    })
    this.getqusc()
    await this.getUrl()
    this.backgroundAudioManager.src = this.data.musicUrl;
    this.backgroundAudioManager.title = this.data.songdetail.name;
    this.setData({
      isplay: true
    })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const songid = options.songid
    console.log(songid)
    this.setData({
      songid
    })

    this.getqusc()

    this.getUrl()
    const { audioId, playState } = appInstance.globalData;
    if (playState && audioId ===songid ){
      this.setData({
        isplay: true
      })
    }

    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    this.addEvE()


    PubSub.subscribe('songid', this.getSongId)
   
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