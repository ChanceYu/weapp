Page({
  showToptipSuccess() {
    this.setData({
      type: 'success',
      title: '提示信息'
    });
  },
  showToptipError() {
    this.setData({
      type: 'error',
      title: '提示信息'
    });
  },
  showToptipWarn() {
    this.setData({
      type: 'warn',
      title: '提示信息'
    });
  }
})