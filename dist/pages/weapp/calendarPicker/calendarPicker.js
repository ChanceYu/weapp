Page({
  data: {
    date: '',
    isCalendarPickerShow: true
  },
  showCalendarPicker() {
    this.setData({
      isCalendarPickerShow: true
    })
  },
  onChangeDate(event){
    this.setData({
      date: event.detail.currentDate
    });
  }
})