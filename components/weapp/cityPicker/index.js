import WeAppComponent from '../weappComponent';

class CityPicker extends WeAppComponent {
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

      componentInstance.options.onChange && componentInstance.options.onChange(region);
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