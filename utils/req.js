import config from './config.js'

export default function(url,data={},method=""){
  return new Promise((resolve,rje) => {
    wx.request({
      url: config.host + url,
      data: data,
      method: method,
      header:{
        Cookie: wx.getStorageSync("cookie")
      },
      success: (res) => {

        if (data.isLogin){
          wx.setStorageSync("cookie",res.cookies.find((item) => {
            return item.startsWith('MUSIC_U');
          }))
        }
        resolve(res.data)
      }
    })
  })
 
}