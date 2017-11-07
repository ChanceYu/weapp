import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    weapp.inject(this);

    this.oLoader = weapp.Loader();
  },
  handlerNoMore() {
    this.oLoader.setStatus('nomore');
  },
  handlerEmpty() {
    this.oLoader.setStatus('empty');
  }
})