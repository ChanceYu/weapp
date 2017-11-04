import Component from '../component';

class Tab extends Component{
  static defaultOptions = {
    id: '_WeAppTab_',
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
    this.pageScope._WeAppTabAction_ = (event) => {
      let { dataset, componentId, componentData, componentInstance} = this.getComponentInfo(event);
      let idx = dataset.idx;

      componentData.activeIndex = idx;

      this.handlerComponentData(componentInstance, componentData);
      
      componentInstance.options.onChange && componentInstance.options.onChange(idx);
    }
  }
  select(index) {
    let componentData = this.handlerComponentData(this);

    componentData.activeIndex = index;

    this.handlerComponentData(this, componentData);
  }
}

module.exports = Tab;