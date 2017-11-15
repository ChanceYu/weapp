import weapp from '../../../components/weapp/index';

let allDirs = 'tl tc tr rt rc rb bl bc br lt lc lb';
let currIndex = -1;

allDirs = allDirs.split(' ');

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
    currIndex++;

    if (currIndex == allDirs.length) currIndex = 0;

    let dir = allDirs[currIndex];

    this.oPopover.show(event, dir);
  }
})