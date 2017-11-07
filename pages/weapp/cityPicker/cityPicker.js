import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    weapp.inject(this);

    weapp.CityPicker({
      onChange(region){
        console.log(region)
      }
    });
  }
})