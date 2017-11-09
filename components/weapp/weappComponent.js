/**
 * 父组件
 * 每个组件的类可继承自父组件
 * 封装所有组件使用的公共逻辑
 */

class WeAppComponent {
  constructor(options) {
    this.options = options;

    this._initData_();
  }
  /**
   * 获取页面对象
   */
  get pageScope(){
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];

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
   * 获取组件的信息（根据参数event）
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