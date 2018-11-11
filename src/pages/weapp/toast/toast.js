Page({
  showToast() {
    this.setData({
      toastTitle: '你好，weapp'
    });
  },
  showToastDelay() {
    this.setData({
      toastTitle: '你好，5秒之后消失哦'
    });
  },
  onToastHide(){
    wx.showModal({
      content: '隐藏了Toast'
    });
  }
})