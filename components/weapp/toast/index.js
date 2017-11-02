let Toast = {
  /**
   * 默认参数
   */
  defaults: {
    timer: null,
    delay: 2000
  },
  /**
   * 显示
   */
  show(title, delay) {
    this.pageScope.setData({
      _ToastData_: {
        title: title,
        show: true
      }
    });

    clearTimeout(this.defaults.timer);
    this.defaults.timer = setTimeout(
      () => this.hide(), delay || this.defaults.delay
    );
  },
  /**
   * 隐藏
   */
  hide(){
    this.pageScope.setData({
      _ToastData_: {
        show: false
      }
    });
  }
};

module.exports = Toast;