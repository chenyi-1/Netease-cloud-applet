import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: ""
  },


  handlephone(event){
    let { value} =  event.detail
    this.setData({
      phone: value
    })
  },

  handlepassword(event){
    let { value} = event.detail
    console.log('hidesPassword', value)
    this.setData({
      password: value
    })
  },

  handleInput(event){
    let { value } = event.detail
    let { type } = event.target.dataset;
    console.log('handleInput', event.target.dataset.type)
    this.setData({
      [type] : value
    })
  },

  async handleLogin(){
   
    const { phone, password } = this.data
    if (!phone.trim()) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none',
        
      })
      return
    }

    if(!password.trim()){
      wx.showToast({
        title: "请输入密码",
        icon: "none"
      })
      return
    }


    const pagtt = { phone, password, isLogin: true }
    
    let reqius = await req("/login/cellphone",  pagtt , "GET")
    wx.setStorageSync("userInfo", JSON.stringify(reqius.profile))

    let code = reqius.code
    if (code === 200	){
      wx.showToast({
        title: "登入成功",
        icon: "success"
      }),

      wx.switchTab({
        url: "/pages/personal/personal"
      })
      return
    }

    if (code === 400 || code === 502	){
      wx.showToast({
        title: "手机号或密码错误",
        icon: "none"
      })
      return
    }
    
  
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    
  
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