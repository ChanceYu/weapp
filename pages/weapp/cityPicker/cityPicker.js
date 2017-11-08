import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    weapp.CityPicker({
      onChange(region){
        console.log(region)
      }
    });
  }
})