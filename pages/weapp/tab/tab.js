import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    weapp.Tab({
      id: 'oTab1',
      list: ['选项1', '选项2', '选项3'],
      onChange(idx) {
        console.log('选项-' + idx);
      }
    });

    this.ActivityTab = weapp.Tab({
      id: 'oTab2',
      className: 'weapp-tab',
      list: ['活动1', '活动2'],
      onChange(idx) {
        console.log('活动-' + idx);
      }
    });
  },
  handlerSelect(){
    this.ActivityTab.select(1);
  }
})