import Component from '../component';

class Tab extends Component{
  constructor(pageScope, options) {
    super(pageScope, options);

    this.initData();
    this.injectEvents();
  }
  /**
   * 初始化数据
   */
  initData() {
    let data = {
      _id_: this.options.id,
      activeIndex: this.options.activeIndex || 0,
      className: this.options.className || '',
      list: this.options.list
    };

    this.pageScope.setData({
      [this.options.id]: data
    });
  }
  /**
   * 挂载组件的事件函数到 Page 对象
   */
  injectEvents(){
    this.pageScope._TabAction = (event) => {
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