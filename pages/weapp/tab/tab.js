Page({
  data: {
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
  onTabChange(event){
    console.log(event.detail.activeIndex)
  }
})