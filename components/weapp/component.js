/**
 * 父组件
 * 每个组件的类可继承自父组件
 * 封装所有组件使用的公共逻辑
 */

class Component{
  constructor(pageScope, options) {
    this.pageScope = pageScope;
    this.options = options;

    // 挂载当前组件到 Page 对象
    this.pageScope[options.id] = this;
  }
  /**
   * 获取组件的信息（根据参数event）
   */
  getComponentInfo(event) {
    let dataset = event.currentTarget.dataset;
    let idx = dataset.idx;
    let componentId = dataset.componentId;
    let componentInstance = this.pageScope[componentId];
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
  handlerComponentData(componentInstance, data) {
    let id = componentInstance.options.id;

    if (data) {
      /* set */
      let _data = Object.assign({}, this.handlerComponentData(componentInstance), data);

      componentInstance.pageScope.setData({
        [id]: _data
      });
    } else {
      /* get */
      return componentInstance.pageScope.data[id];
    }
  }
};

module.exports = Component;