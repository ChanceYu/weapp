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