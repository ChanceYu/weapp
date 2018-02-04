Page({
  data: {
    activeIndex: 0,
    activeIndex2: 0,
    list1: ['选项1', '选项2', '选项3'],
    list2: ['活动1', '活动2']
  },
  onReady() {
    
  },
  handlerSelect(){
    this.setData({
      activeIndex: 1
    });
  },
  onTabChange(event) {
    this.setData({
      activeIndex: event.detail.activeIndex
    });
  },
  onTabChange2(event) {
    this.setData({
      activeIndex2: event.detail.activeIndex
    });
  }
})