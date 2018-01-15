let allDirs = 'tl tc tr rt rc rb bl bc br lt lc lb';
let currIndex = -1;

allDirs = allDirs.split(' ');

Page({
  showPopover(event) {
    currIndex++;

    if (currIndex == allDirs.length) currIndex = 0;

    let dir = allDirs[currIndex];

    this.setData({
      list: ['选项1', '选项2', '选项3'],
      dir: dir,
      event: event,
      show: true
    });
  },
  showPopover2(event) {
    this.setData({
      list: ['操作菜单1', '操作菜单2', '操作菜单3'],
      dir: 'tc',
      event: event,
      show: true
    });
  },
  onSelectPopover(event) {
    console.log(event.detail.item);
  }
})