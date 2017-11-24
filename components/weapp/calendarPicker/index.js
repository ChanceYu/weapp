import WeAppComponent from '../weappComponent';
import MonthDate from './monthDate';

class CalendarPicker extends WeAppComponent {
  /**
   * 默认参数
   * @param {String} id 组件id
   * @param {String} startDate 开始日期
   * @param {String} endDate 结束日期
   * @param {String} currentDate 默认选择的日期
   * @param {String} format 格式化
   * @param {Boolean} show 是否显示
   * @param {Number} current 默认显示第几个月，从开始日期为第一个月，current = 0
   * @param {Function} onChange 选中日期的回调函数
   */
  static defaultOptions = {
    id: 'WeApp_CalendarPicker',
    startDate: '',
    endDate: '',
    currentDate: '',
    format: 'YYYY-MM-DD',
    show: false,
    current: 0,
    onChange: null
  }
  constructor(options) {
    super(Object.assign({}, CalendarPicker.defaultOptions, options), CalendarPicker);

    this._getTotalMonth();
  }
  static listeners = {
    WeApp_CalendarPicker_Change(event) {
      let { componentId, componentData, componentInstance } = this._getComponentByEvent_(event);
      let current = event.detail.current;

      componentData.current = current;

      this._componentData_(componentInstance, componentData);

      componentInstance._setSwiperHeight();
    },
    WeApp_CalendarPicker_ChangeToPrev(event) {
      let { componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      componentData.current--;

      if (componentData.current < 0) componentData.current = 0;

      this._componentData_(componentInstance, componentData);
    },
    WeApp_CalendarPicker_ChangeToNext(event) {
      let { componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      componentData.current++;

      if (componentData.current >= componentData.months.length) componentData.current = componentData.months.length - 1;

      this._componentData_(componentInstance, componentData);
    },
    WeApp_CalendarPicker_ChangeToToday(event) {
      let { componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      componentData.current = componentData.todayMonthIndex;
      componentData.currentDate = componentData.todayDate;

      this._componentData_(componentInstance, componentData);

      if (typeof componentInstance.options.onChange === 'function') {
        componentInstance.options.onChange(componentData.currentDate);
      }
    },
    WeApp_CalendarPicker_TapMask(event) {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      componentData.show = false;

      this._componentData_(componentInstance, componentData);
    },
    WeApp_CalendarPicker_TapDate(event) {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      if (dataset.disabled) return;

      componentData.currentDate = dataset.datestr;

      this._componentData_(componentInstance, componentData);

      if (typeof componentInstance.options.onChange === 'function') {
        componentInstance.options.onChange(dataset.datestr);
      }
    }
  }
  _setSwiperHeight(){
    let boxId = `WeApp_CalendarPicker_Box_${this.options.id}`;

    wx.createSelectorQuery().selectAll(`#${boxId} .weapp-calendar-picker-month`).boundingClientRect((rects)=>  {
      let componentData = this._componentData_(this);

      let rect = rects[componentData.current];

      if(!rect || !rect.height) return;

      componentData.swiperHeight = rect.height + 'px';

      this._componentData_(this, componentData);
    }).exec();
  }
  _getTotalMonth(){
    let options = this.options;
    let oMonth = new MonthDate({
      startDate: options.startDate,
      endDate: options.endDate,
      format: options.format
    });
    let months = oMonth.getTotal();
    let enableToday = oMonth.getToday();

    let componentData = this._componentData_(this);

    if (enableToday) {
      componentData.showTodayBtn = true;
      componentData.todayMonthIndex = enableToday.monthIndex;
      componentData.todayDate = enableToday.date;
    }

    componentData.months = months;

    this._componentData_(this, componentData);
  }
  /**
   * 显示
   */
  show() {
    let componentData = this._componentData_(this);

    componentData.show = true;

    this._componentData_(this, componentData);
    
    setTimeout(() => { this._setSwiperHeight() }, 30);
  }
  /**
   * 隐藏
   */
  hide() {
    let componentData = this._componentData_(this);

    componentData.show = false;

    this._componentData_(this, componentData);
  }
}

module.exports = CalendarPicker;