import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistance: 0,
    moveTransition: null,
    userInfo: [],
    res: []
  },

  henodeStart(event){
    this.startY = event.changedTouches[0].clientY
    console.log(event)
    this.setData({
      moveTransition: null
    })
  },

  henodeMove(event){
    let moveY = event.changedTouches[0].pageY
    let moveDistance = moveY - this.startY
    console.log(moveDistance)
    if (moveDistance < 80 && moveDistance > 0){
      this.setData({
        moveDistance
      })
    }
    
  },

  henodeChend(event){
    this.setData({
      moveDistance: 0,
      moveTransition: "transform 400ms"
    })
  },

  henghTap(){
    if (!this.data.userInfo.nickname){
      wx.navigateTo({
        url: '../login/login'
      })
    }

  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    let userInfoStr = wx.getStorageSync('userInfo');
    let userInfo = JSON.parse(userInfoStr || "{}")

    let uid = userInfo.userId
    console.log(uid)
    req('/user/record', { uid: uid }, "GET").then(({ weekData}) => {
      const res = weekData[0].song.al
      this.setData({
        res
      })
      })
    
    this.setData({
      userInfo,
    })


    
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