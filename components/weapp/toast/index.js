let Toast = {
  /**
   * 默认参数
   */
  defaultOptions: {
    timer: null,
    delay: 1500
  },
  /**
   * 显示
   */
  show(title, delay, onHide) {
    this.pageScope.setData({
      _ToastData_: {
        title: title,
        show: true
      }
    });

    clearTimeout(this.defaultOptions.timer);
    this.defaultOptions.timer = setTimeout(
      () => this.hide(onHide),
      delay || this.defaultOptions.delay
    );
  },
  /**
   * 隐藏
   */
  hide(onHide){
    this.pageScope.setData({
      _ToastData_: {
        show: false
      }
    });

    if (typeof onHide === 'function'){
      onHide();
    }
  }
};

module.exports = Toast;