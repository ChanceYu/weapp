import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    this.oCP = weapp.CalendarPicker({
      onChange(date) {
        console.log(date)
      }
    });
  },
  showCalendarPicker(){
    this.oCP.show();
  }
})