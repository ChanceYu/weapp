import WeAppComponent from '../weappComponent';

class Tab extends WeAppComponent{
  static defaultOptions = {
    id: 'WeApp_Tab',
    activeIndex: 0,
    className: '',
    onChange: null
  }
  constructor(options) {
    super(Object.assign({}, Tab.defaultOptions, options));

    this._injectEvents();
  }
  _injectEvents(){
    this.pageScope.WeApp_Tab_Action = (event) => {
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