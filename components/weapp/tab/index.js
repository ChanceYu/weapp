import WeAppComponent from '../weappComponent';

class Tab extends WeAppComponent {
  /**
   * 默认参数
   * @param {String} id 组件id
   * @param {Number} activeIndex 选中的索引
   * @param {String} className 主题样式
   * @param {Function} onChange 切换的回调函数
   */
  static defaultOptions = {
    id: 'WeApp_Tab',
    activeIndex: 0,
    className: '',
    onChange: null
  }
  constructor(options) {
    super(options, Tab);
  }
  static listeners = {
    WeApp_Tab_Action(event) {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);
      let idx = dataset.idx;

      componentData.activeIndex = idx;

      this._componentData_(componentInstance, componentData);

      if (typeof componentInstance.options.onChange === 'function') {
        componentInstance.options.onChange(idx);
      }
    }
  }
  /**
   * 设置选中的Tab
   * @param {Number} index 对应的索引
   */
  select(index) {
    let componentData = this._componentData_(this);

    componentData.activeIndex = index;

    this._componentData_(this, componentData);
  }
}

module.exports = Tab;