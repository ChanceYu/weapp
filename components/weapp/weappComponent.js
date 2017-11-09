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
    this.pageScope._WeAppComponents_ = this.pageScope._WeAppComponents_ || {};
    this.pageScope._WeAppComponents_[this.options.id] = this;

    this.pageScope.setData({
      [this.options.id]: this.options
    });
  }
  /**
   * 获取组件的信息（根据参数event）
   */
  _getComponentByEvent_(event) {
    let dataset = event.currentTarget.dataset;
    let idx = dataset.idx;
    let componentId = dataset.componentId;
    let componentInstance = this.pageScope._WeAppComponents_[componentId];
    let componentData = this.pageScope.data[componentId];

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
};

module.exports = WeAppComponent;