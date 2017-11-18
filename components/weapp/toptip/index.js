const Toptip = {
  /**
   * 默认参数
   * @param {String} id 组件id
   * @param {Number} delay 自动关闭的延迟时间
   * @param {Number|Null} timer 定时器
   */
  defaultOptions: {
    id: 'WeApp_Toptip',
    delay: 1500,
    type: 'default',
    timer: null
  },
  /**
   * 显示成功
   * @param {String} title 信息内容
   * @param {Number} delay 延迟关闭时间
   * @param {Function} onHide 关闭之后的回调函数
   */
  success(title, delay, onHide) {
    this.show(title, 'success', delay, onHide);
  },
  /**
   * 显示失败
   * @param {String} title 信息内容
   * @param {Number} delay 延迟关闭时间
   * @param {Function} onHide 关闭之后的回调函数
   */
  error(title, delay, onHide) {
    this.show(title, 'error', delay, onHide);
  },
  /**
   * 显示警告
   * @param {String} title 信息内容
   * @param {Number} delay 延迟关闭时间
   * @param {Function} onHide 关闭之后的回调函数
   */
  warn(title, delay, onHide) {
    this.show(title, 'warn', delay, onHide);
  },
  /**
   * 显示
   * @param {String} title 信息内容
   * @param {String} type 提示类型，成功、失败、警告
   * @param {Number} delay 延迟关闭时间
   * @param {Function} onHide 关闭之后的回调函数
   */
  show(title, type, delay, onHide) {
    let defaultOptions = this.defaultOptions;

    this.pageScope.setData({
      [defaultOptions.id]: {
        title: title,
        show: true,
        type: type || defaultOptions.type
      }
    });

    clearTimeout(defaultOptions.timer);
    defaultOptions.timer = setTimeout(
      () => this.hide(onHide),
      delay || defaultOptions.delay
    );
  },
  /**
   * 隐藏
   * @param {Function} onHide 关闭之后的回调函数
   */
  hide(onHide) {
    this.pageScope.setData({
      [this.defaultOptions.id]: {
        show: false
      }
    });

    if (typeof onHide === 'function') {
      onHide();
    }
  }
};

module.exports = Toptip;