import WeAppComponent from '../weappComponent';
import monthDate from './monthDate';

class CalendarPicker extends WeAppComponent {
  /**
   * 默认参数
   * @param {String} id 组件id
   */
  static defaultOptions = {
    id: 'WeApp_CalendarPicker',
    startDate: '2017-05-06',
    endDate: '2017-11-08',
    selectedDate: '2017-05-06',
    format: 'YYYY-MM-DD',
    show: false,
    current: 0
  }
  constructor(options) {
    super(Object.assign({}, CalendarPicker.defaultOptions, options));

    this._injectEvents();
    this._getTotalMonth();
  }
  _injectEvents() {
    let pageScope = this.pageScope;

    pageScope.WeApp_CalendarPicker_Change = (event) => {
      let { componentId, componentData, componentInstance } = this._getComponentByEvent_(event);
      let current = event.detail.current;

      componentData.current = current;

      this._componentData_(componentInstance, componentData);
    }

    pageScope.WeApp_CalendarPicker_ChangeToPrev = (event) => {
      let { componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      componentData.current--;

      if (componentData.current < 0) componentData.current = 0;

      this._componentData_(componentInstance, componentData);
    }

    pageScope.WeApp_CalendarPicker_ChangeToNext = (event) => {
      let { componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      componentData.current++;

      if (componentData.current >= componentData.months.length) componentData.current = componentData.months.length - 1;

      this._componentData_(componentInstance, componentData);
    }

    pageScope.WeApp_CalendarPicker_TapMask = (event) => {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      componentData.show = false;

      this._componentData_(componentInstance, componentData);
    }

    pageScope.WeApp_CalendarPicker_TapDate = (event) => {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      componentData.selectedDate = dataset.datestr;

      this._componentData_(componentInstance, componentData);
    }
  }
  _getTotalMonth(){
    let oMonth = new monthDate();
    let months = oMonth.getTotal();

    console.log(months)

    let componentData = this._componentData_(this);

    componentData.months = months;

    this._componentData_(this, componentData);
  }
  show() {
    let componentData = this._componentData_(this);

    componentData.show = true;

    this._componentData_(this, componentData);
  }
  hide() {
    let componentData = this._componentData_(this);

    componentData.show = false;

    this._componentData_(this, componentData);
  }
}

module.exports = CalendarPicker;