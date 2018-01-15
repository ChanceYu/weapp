Page({
  onReady() {
    this.setData({
      isCityPickerShow: true
    });
  },
  onChangeCity(event){
    console.log(event.detail.region)
  }
})