/**
 * 父组件
 * 每个组件的类可继承自父组件
 * 封装所有组件使用的公共逻辑
 */

class WeAppComponent{
  static _components_ = {}
  constructor(pageScope, options) {
    this.pageScope = pageScope;
    this.options = options;

    WeAppComponent._components_[options.id] = this;
  }
  /**
   * 获取组件的信息（根据参数event）
   */
  _getComponentByEvent_(event) {
    let dataset = event.currentTarget.dataset;
    let idx = dataset.idx;
    let componentId = dataset.componentId;
    let componentInstance = WeAppComponent._components_[componentId];
    let componentData = componentInstance.pageScope.data[componentId];

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

      componentInstance.pageScope.setData({
        [id]: _data
      });
    } else {
      /* get */
      return componentInstance.pageScope.data[id];
    }
  }
};

module.exports = WeAppComponent;