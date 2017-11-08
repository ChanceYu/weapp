import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    this.oLoader = weapp.Loader();
  },
  handlerNoMore() {
    this.oLoader.setStatus('nomore');
  },
  handlerEmpty() {
    this.oLoader.setStatus('empty');
  }
})