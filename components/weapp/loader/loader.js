Component({
  properties: {
    iconType: {
      type: String,
      value: 'search'
    },
    status: {
      type: String,
      value: 'loading'
    },
    emptyTxt: {
      type: String,
      value: '暂无数据'
    },
    loadingTxt: {
      type: String,
      value: '正在加载'
    },
    nomoreTxt: {
      type: String,
      value: '没有更多数据了'
    }
  }
})