/*!
 * WeApp v1.0.0 (https://github.com/ChanceYu/weapp)
 * Copyright 2017 ChanceYu.
 * Licensed under the MIT license
 */

class WeAppComponent {
  constructor(options, ComponentConstructor) {
    this.options = Object.assign({}, ComponentConstructor.defaultOptions || {}, options || {});

    this._injectListeners_(ComponentConstructor);
    this._initData_();
  }
  /**
   * 获取页面对象
   * @return {Object} 页面对象
   */
  get pageScope(){
    if (this._pageScope_) return this._pageScope_;

    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];

    this._pageScope_ = currPage;

    return currPage;
  }
  /**
   * 初始化数据
   */
  _initData_() {
    let id = this.options.id;
    let pageScope = this.pageScope;

    pageScope._WeAppComponents_ = pageScope._WeAppComponents_ || {};
    pageScope._WeAppComponents_[id] = this;

    pageScope.setData({
      [id]: this.options
    });
  }
  /**
   * 挂载组件事件
   * @param  {Function} ComponentConstructor 组件构造函数
   */
  _injectListeners_(ComponentConstructor) {
    if (!ComponentConstructor || !ComponentConstructor.listeners) return;

    let listeners = ComponentConstructor.listeners;
    let pageScope = this.pageScope;

    for (let event in listeners){
      if (!listeners.hasOwnProperty(event) || typeof listeners[event] !== 'function') continue;

      pageScope[event] = listeners[event].bind(this);
    }
  }
  /**
   * 获取组件的信息
   * @param  {Event} event 事件对象
   * @return {Object} 组件的信息
   */
  _getComponentByEvent_(event) {
    let pageScope = this.pageScope;
    let dataset = event.currentTarget.dataset;
    let componentId = dataset.componentId;
    let componentData = pageScope.data[componentId];
    let componentInstance = pageScope._WeAppComponents_[componentId];

    return {
      dataset: dataset,
      componentId: componentId,
      componentData: componentData,
      componentInstance: componentInstance
    }
  }
  /**
   * 设置组件的 data 数据
   * @param  {Object} componentInstance 组件实例
   * @param  {Object} data 要设置的数据
   * @return {Object} 组件的数据
   */
  _componentData_(componentInstance, data) {
    let id = componentInstance.options.id;

    if (data) {
      /* set */
      let _data = Object.assign({}, this._componentData_(componentInstance), data);

      this.pageScope.setData({
        [id]: _data
      });
    } else {
      /* get */
      return this.pageScope.data[id];
    }
  }
  /**
   * 统一处理组件异常提示
   * @param {String} msg 错误信息
   */
  _throwError_(msg){
    throw new Error(`WeApp提示：${msg}`);
  }
  /**
   * 销毁组件
   */
  destroy(){
    let id = this.options.id;
    let pageScope = this.pageScope;

    pageScope.setData({
      [id]: null
    });

    delete pageScope.data[id];
    delete pageScope._WeAppComponents_[id];
  }
};

module.exports = WeAppComponent;