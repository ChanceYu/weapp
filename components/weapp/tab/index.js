import WeAppComponent from '../weappComponent';

class Tab extends WeAppComponent{
  static defaultOptions = {
    id: 'WeApp_Tab',
    activeIndex: 0,
    className: ''
  }
  constructor(pageScope, options) {
    super(pageScope, Object.assign({}, Tab.defaultOptions, options));

    this.initData();
    this.injectEvents();
  }
  /**
   * 初始化数据
   */
  initData() {
    this.pageScope.setData({
      [this.options.id]: this.options
    });
  }
  /**
   * 挂载组件的事件函数到 Page 对象
   */
  injectEvents(){
    this.pageScope.WeApp_Tab_Action = (event) => {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);
      let idx = dataset.idx;

      componentData.activeIndex = idx;

      this._componentData_(componentInstance, componentData);
      
      componentInstance.options.onChange && componentInstance.options.onChange(idx);
    }
  }
  select(index) {
    let componentData = this._componentData_(this);

    componentData.activeIndex = index;

    this._componentData_(this, componentData);
  }
}

module.exports = Tab;