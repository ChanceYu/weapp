import WeAppComponent from '../weappComponent';

class CityPicker extends WeAppComponent {
  /**
   * 默认参数
   * @param {String} id 组件id
   * @param {Array} region 默认区域
   * @param {String} showLabel 展示的信息
   * @param {Function} onChange 选择之后的回调函数
   * @param {Function} onSetLabel 修改显示的文字，必须返回字符串内容
   */
  static defaultOptions = {
    id: 'WeApp_CityPicker',
    region: [],
    showLabel: '',
    onChange: null,
    onSetLabel: null
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
    let region = componentData.region;

    if (region.length){
      let regionStr = region.join(', ');
      let showLabel = '当前选择：' + regionStr;

      if (typeof this.options.onSetLabel === 'function'){
        showLabel = this.options.onSetLabel(region);
      }

      componentData.showLabel = showLabel;
    }else{
      componentData.showLabel = '请选择城市';
    }

    this._componentData_(this, componentData);
  }
}

module.exports = CityPicker;