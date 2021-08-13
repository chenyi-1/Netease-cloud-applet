import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    currentId: "",
    videoList: [],
    vidId: "",
    refs: false
  },

  vidId(event){
    const { id } = event.currentTarget
    console.log(id)
    this.setData({
      vidId: id
    }, () => {
      const videoContext = wx.createVideoContext(id)
      videoContext.play()
    })
  },

  async refresherrefresh(){
    await this.getVideoList()

    this.setData({
      refs: false
    })
  },

  scrollto(){
    setTimeout(() => {
      this.setData({
        videoList: [...this.data.videoList, ...this.data.videoList]
      })
    },1000)
  },

  testAPI(){
    const videoContext = wx.createVideoContext("vid0");
    videoContext.pause();
  },

  handlePlay(event){
    const { id } = event.currentTarget
    console.log(id)
    if (this.oldVId && this.oldVId !== id){
      const videoContext = wx.createVideoContext(this.oldVId);
      videoContext.pause();
    }
    console.log(id)
    this.oldVId = id
  },
  

  async getVideoList(){
    const { datas } = await req('/video/group',{id: this.data.currentId},"GET")
    console.log(datas)
    const videoList = datas.map((item) => {
      return item.data
    })
    this.setData({
      videoList
    })
    wx.hideLoading();
  },

  changeCurrentId(event){
    const { id } = event.currentTarget.dataset;

    this.setData({
      currentId: id,
      videoList: []
    })

    wx.showLoading({
      title: "正在加载"
    })
    this.getVideoList()
  },

  



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    const cookie = wx.getStorageSync('cookie')
    if(!cookie) {
      wx.showModal({
        title: "请先登录",
        content: "该功能需要登录帐号",
        cancelText: "回到首页",
        confirmText: "去登陆",
        success({ confirm, cancel}){
          if(confirm){
            wx.navigateTo({
              url: "/pages/login/login"
            })
          }else{
            wx.switchTab({
              url: "/pages/index/index"
            })
          }
        }
      })
    }

    let { data} = await req("/video/group/list", {}, "GET")
    
    this.setData({
      navList:data.slice(0, 14),
      currentId: data[0].id
    })
    this.getVideoList()
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