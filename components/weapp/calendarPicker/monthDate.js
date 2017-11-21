import moment from '../../libs/moment/we-moment-with-locales';

class SingleMonth{
  static defaultOptions = {
    startDate: '2017-11-06',
    endDate: '2017-11-28',
    format: 'YYYY-MM-DD'
  }
  constructor(options) {
    this.options = Object.assign({}, SingleMonth.defaultOptions, options);
  }
  getCurrentMonthDisableDateCell(cells, type /* prev | next */) {
    let startDate = this.options.startDate;
    let endDate = this.options.endDate;
    let format = this.options.format;
    
    let prevJudge = () => {
      return startDate != moment(startDate).startOf('month').format(format);
    };
    let nextJudge = () => {
      return endDate != moment(endDate).endOf('month').format(format)
    };

    if ((type == 'prev' && prevJudge()) || (type == 'next' && nextJudge())) {
      let disabledDays = 0;
      if (type == 'prev') {
        disabledDays = moment(startDate).get('date') - moment(startDate).startOf('month').get('date');
      } else {
        disabledDays = moment(endDate).endOf('month').get('date') - moment(endDate).get('date');
      }

      for (let i = 1; i <= disabledDays; i++) {
        let method = '';
        let cellDate;

        if (type == 'prev') {
          method = 'unshift';
          cellDate = moment(startDate).subtract(i, 'days');
        } else {
          method = 'push';
          cellDate = moment(endDate).subtract(-i, 'days');
        }

        cells[method]({
          date: cellDate.format(format),
          week: cellDate.weekday(),
          day: cellDate.format('DD'),
          disabled: true
        });
      }
    }
  }
  getEdgeMonthDateCell(cells, type /* prev | next */) {
    let startDate = this.options.startDate;
    let endDate = this.options.endDate;
    let format = this.options.format;

    let weekOfEdgeDate;
    if (type == 'prev') {
      weekOfEdgeDate = moment(startDate).startOf('month').weekday();
    } else {
      weekOfEdgeDate = moment(endDate).endOf('month').weekday();
    }

    if ((type == 'prev' && weekOfEdgeDate != 1) || (type == 'next' && weekOfEdgeDate != 0)) {
      if (type == 'prev' && weekOfEdgeDate == 0) {
        weekOfEdgeDate = 7;
      } else if (type == 'next') {
        weekOfEdgeDate = 8 - weekOfEdgeDate;
      }

      for (let i = 1; i < weekOfEdgeDate; i++) {
        let method = '';
        let cellDate;
        let data = {
          disabled: true
        };

        if (type == 'prev') {
          data.isPrevMonth = true;
          method = 'unshift';
          cellDate = moment(startDate).startOf('month').subtract(i, 'days');
        } else {
          data.isNextMonth = true;
          method = 'push';
          cellDate = moment(endDate).endOf('month').subtract(-i, 'days');
        }

        data.date = cellDate.format(format);
        data.week = cellDate.weekday();
        data.day = cellDate.format('DD');

        cells[method](data);
      }
    }
  }
  getCurrentMonthClickableDateCell(cells) {
    let startDate = this.options.startDate;
    let endDate = this.options.endDate;
    let format = this.options.format;

    if (startDate == endDate) {
      // when startDate == endDate ( only one day )
      let singleDate = moment(endDate);

      cells.push({
        date: singleDate.format(format),
        week: singleDate.weekday(),
        day: singleDate.format('DD')
      });
    }

    while (startDate != endDate) {
      let cellDate = moment(startDate);

      cells.push({
        date: cellDate.format(format),
        week: cellDate.weekday(),
        day: cellDate.format('DD')
      });

      startDate = cellDate.subtract(-1, 'days').format(format);

      if (startDate == endDate) {
        cellDate = moment(endDate);

        cells.push({
          date: cellDate.format(format),
          week: cellDate.weekday(),
          day: cellDate.format('DD')
        });
      }
    }
  }
  getTotalDateCell() {
    var cells = [];

    // 开始时间之前 不可点击的日期
    this.getCurrentMonthDisableDateCell(cells, 'prev');

    // 上个月 补位的日期
    this.getEdgeMonthDateCell(cells, 'prev');

    // 当前月 可点击的日期
    this.getCurrentMonthClickableDateCell(cells);

    // 结束时间之后 不可点击的日期
    this.getCurrentMonthDisableDateCell(cells, 'next');

    // 下个月 补位的日期
    this.getEdgeMonthDateCell(cells, 'next');

    return cells;
  }
}

class MonthDate {
  static defaultOptions = {
    startDate: '2017-05-06',
    endDate: '2017-11-28',
    format: 'YYYY-MM-DD'
  }
  constructor(options) {
    this.options = Object.assign({}, MonthDate.defaultOptions, options);
  }
  getTotal() {
    let startDate = this.options.startDate;
    let endDate = this.options.endDate;
    let format = this.options.format;

    let monthData = [];
    let startEdgeDateOfStartDate = moment(startDate).startOf('month').format(format);
    let startEdgeDateOfEndDate = moment(endDate).startOf('month').format(format);

    let oMonth;

    if (startEdgeDateOfStartDate == startEdgeDateOfEndDate) {
      oMonth = new SingleMonth({
        startDate: startDate,
        endDate: endDate
      });

      monthData.push({
        title: moment(startDate).format('YYYY-MM'),
        dates: oMonth.getTotalDateCell()
      });
    } else {
      let _startDate = startDate;
      let _endDate = moment(startDate).endOf('month').format(format);

      while (_startDate !== startEdgeDateOfEndDate) {
        oMonth = new SingleMonth({
          startDate: _startDate,
          endDate: _endDate
        });

        monthData.push({
          title: moment(_startDate).format('YYYY-MM'),
          dates: oMonth.getTotalDateCell()
        });

        let nextMonth = moment(_endDate).subtract(-1, "days");

        _startDate = nextMonth.startOf('month').format(format);
        _endDate = nextMonth.endOf('month').format(format);
      }

      oMonth = new SingleMonth({
        startDate: startEdgeDateOfEndDate,
        endDate: endDate
      });

      monthData.push({
        title: moment(startEdgeDateOfEndDate).format('YYYY-MM'),
        dates: oMonth.getTotalDateCell()
      });
    }

    return monthData;
  }
};

module.exports = MonthDate;