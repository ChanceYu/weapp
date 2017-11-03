import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    weapp.inject(this);

    weapp.Tab({
      id: 'oTab1',
      list: [{
        title: '选项1'
      }, {
        title: '选项2'
      }, {
        title: '选项3'
      }],
      onChange(idx) {
        console.log('选项-' + idx);
      }
    });

    weapp.Tab({
      id: 'oTab2',
      className: 'weapp-tab',
      list: [{
        title: '活动1'
      }, {
        title: '活动2'
      }],
      onChange(idx) {
        console.log('活动-' + idx);
      }
    });
  }
})