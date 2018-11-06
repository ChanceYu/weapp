import MonthCalculator from './month-calculator';

Component({
  properties: {
    /* 是否显示 */
    show: {
      type: Boolean,
      value: false
    },
    /* 显示第几个月，从开始日期为第一个月 */
    current: {
      type: Number,
      value: 0
    },
    /* 选择的日期 */
    currentDate: {
      type: String,
      value: ''
    },
    /* 开始日期 */
    startDate: {
      type: String,
      value: '',
      observer(newVal, oldVal) {
        this._getTotalMonth();
      }
    },
    /* 结束日期 */
    endDate: {
      type: String,
      value: '',
      observer(newVal, oldVal) {
        this._getTotalMonth();
      }
    },
  },
  ready() {
    this._getTotalMonth();
    this._setSwiperHeight();
  },
  methods: {
    change(event) {
      let current = event.detail.current;

      this.setData({
        current: current
      });

      this._setSwiperHeight();
    },
    changeToPrev(event) {
      let { current } = this.data;

      current--;

      if (current < 0) current = 0;

      this.setData({
        current: current
      });
    },
    changeToNext(event) {
      let { current, months } = this.data;

      current++;

      if (current >= months.length) current = months.length - 1;

      this.setData({
        current: current
      });
    },
    changeToToday(event) {
      let { current, currentDate, todayMonthIndex, todayDate} = this.data;

      this.setData({
        current: todayMonthIndex,
        currentDate: todayDate
      });

      this.triggerEvent('change', { currentDate: todayDate });
    },
    tapMask() {
      this.setData({
        show: false
      });
    },
    tapDate(event) {
      let { current, currentDate, todayMonthIndex, todayDate } = this.data;
      let dataset = event.target.dataset;

      if (dataset.disabled) return;

      this.setData({
        currentDate: dataset.datestr
      });

      this.triggerEvent('change', { currentDate: dataset.datestr });
    },
    _getTotalMonth() {
      let { startDate, endDate } = this.properties;
      let oMonth = new MonthCalculator({
        startDate: startDate,
        endDate: endDate
      });
      let months = oMonth.getTotal();
      let enableToday = oMonth.getToday();
      let data = {};

      if (enableToday) {
        data.showTodayBtn = true;
        data.todayMonthIndex = enableToday.monthIndex;
        data.todayDate = enableToday.date;
      }

      data.months = months;

      this.setData(data);
    },
    _setSwiperHeight() {
      wx.createSelectorQuery().in(this).selectAll(`.weapp-calendar-picker-month`).boundingClientRect((rects) => {
        let { current } = this.data;

        let rect = rects[current];

        if (!rect || !rect.height) return;

        let swiperHeight = rect.height + 'px';

        this.setData({
          swiperHeight: swiperHeight
        });
      }).exec();
    }
  }
})