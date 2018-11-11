Page({
  data: {
    status: 'loading'
  },
  handlerNoMore() {
    this.setData({
      status: 'nomore'
    });
  },
  handlerEmpty() {
    this.setData({
      status: 'empty'
    });
  }
})