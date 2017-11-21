import weapp from '../../../components/weapp/index';

Page({
  data: {
    date: ''
  },
  onReady() {
    this.oCP = weapp.CalendarPicker({
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