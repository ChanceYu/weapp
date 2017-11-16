import weapp from '../../../components/weapp/index';

let allDirs = 'tl tc tr rt rc rb bl bc br lt lc lb';
let currIndex = -1;

allDirs = allDirs.split(' ');

Page({
  showPopover(event) {
    currIndex++;

    if (currIndex == allDirs.length) currIndex = 0;

    let dir = allDirs[currIndex];

    let oPopover = weapp.Popover({
      list: ['选项1', '选项2', '选项3'],
      onSelect(idx) {
        console.log('选项' + idx);
      }
    });

    oPopover.show(event, dir);
  },
  showPopover2(event) {
    let oPopover2 = weapp.Popover({
      list: ['操作菜单1', '操作菜单2', '操作菜单3'],
      onSelect(idx) {
        console.log('操作菜单' + idx);
      }
    });

    oPopover2.show(event, 'tc');
  }
})