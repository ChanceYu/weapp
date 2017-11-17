import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    weapp.CityPicker({
      onChange(region){
        console.log(region)
      },
      onSetLabel(region){
        return '您选择的是：' + region.join(', ');
      }
    });
  }
})