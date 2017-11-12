import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    this.oPopover = weapp.Popover({
      list: ['选项1', '选项2', '选项3'],
      onSelect(idx){
        console.log(idx);
      }
    });
  },
  showPopover(event) {
    this.oPopover.show(event);
  }
})