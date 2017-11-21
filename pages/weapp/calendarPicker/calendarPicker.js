import weapp from '../../../components/weapp/index';

Page({
  data: {
    date: ''
  },
  onReady() {
    this.oCP = weapp.CalendarPicker({
      startDate: '2017-05-06',
      endDate: '2017-11-08',
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