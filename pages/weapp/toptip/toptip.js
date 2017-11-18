import weapp from '../../../components/weapp/index';

Page({
  showToptipSuccess(){
    weapp.Toptip.success('提示信息');
  },
  showToptipError() {
    weapp.Toptip.error('提示信息');
  },
  showToptipWarn() {
    weapp.Toptip.warn('提示信息');
  }
})