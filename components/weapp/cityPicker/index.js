import Component from '../component';

class CityPicker extends Component {
  static defaultOptions = {
    id: 'WeApp_CityPicker',
    region: [],
    showLabel: '',
    onChange: null
  }
  constructor(pageScope, options) {
    super(pageScope, Object.assign({}, CityPicker.defaultOptions, options));

    this.initData();
    this.setShowLabel();
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
  injectEvents() {
    this.pageScope.WeApp_CityPicker_Change = (event) => {
      let { componentId, componentData, componentInstance } = this._getComponentByEvent_(event);
      let region = event.detail.value;

      componentData.region = region;

      this._componentData_(componentInstance, componentData);
      this.setShowLabel();

      componentInstance.options.onChange && componentInstance.options.onChange(region);
    }
  }
  setShowLabel(){
    let componentData = this._componentData_(this);

    if (componentData.region.length){
      componentData.showLabel = '当前选择：' + componentData.region.join(', ');
    }else{
      componentData.showLabel = '请选择城市';
    }

    this._componentData_(this, componentData);
  }
}

module.exports = CityPicker;