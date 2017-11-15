import WeAppComponent from '../weappComponent';

const Toast = {
  /**
   * 默认参数
   */
  defaultOptions: {
    id: 'WeApp_Toast',
    timer: null,
    delay: 1500
  },
  /**
   * 显示
   * @param {String} title 信息内容
   * @param {Number} delay 延迟关闭时间
   * @param {Function} onHide 关闭之后的回调函数
   */
  show(title, delay, onHide) {
    let defaultOptions = this.defaultOptions;

    this.pageScope.setData({
      [defaultOptions.id]: {
        title: title,
        show: true
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

    if (typeof onHide === 'function'){
      onHide();
    }
  }
};

module.exports = Toast;