import WeAppComponent from '../weappComponent';

class CityPicker extends WeAppComponent {
  /**
   * 默认参数
   * @param {String} id 组件id
   * @param {Array} region 默认区域
   * @param {String} showLabel 展示的信息
   * @param {Function} onChange 选择之后的回调函数
   */
  static defaultOptions = {
    id: 'WeApp_CityPicker',
    region: [],
    showLabel: '',
    onChange: null
  }
  constructor(options) {
    super(Object.assign({}, CityPicker.defaultOptions, options));

    this._setShowLabel();
    this._injectEvents();
  }
  _injectEvents() {
    this.pageScope.WeApp_CityPicker_Change = (event) => {
      let { componentId, componentData, componentInstance } = this._getComponentByEvent_(event);
      let region = event.detail.value;

      componentData.region = region;

      this._componentData_(componentInstance, componentData);
      this._setShowLabel();

      if (typeof componentInstance.options.onChange === 'function'){
        componentInstance.options.onChange(region);
      }
    }
  }
  _setShowLabel(){
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