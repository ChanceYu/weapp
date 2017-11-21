import weapp from '../../../components/weapp/index';

Page({
  data: {
    date: ''
  },
  onReady() {
    this.oCP = weapp.CalendarPicker({
      startDate: '2017-07-07',
      endDate: '2018-08-08',
      onChange: (date)  => {
        this.setData({
          date: date
        });
      }
    });
  },
  showCalendarPicker(){
    this.oCP.show();
  }
})