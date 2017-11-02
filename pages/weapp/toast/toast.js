import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    weapp.inject(this);
  },
  showToast() {
    weapp.Toast.show('你好，weapp');
  },
  showToastDelay() {
    weapp.Toast.show('你好，5秒之后消失哦', 5000);
  }
})