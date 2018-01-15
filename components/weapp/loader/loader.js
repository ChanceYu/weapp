Component({
  properties: {
    /* 微信icon组件的type类型 */
    iconType: {
      type: String,
      value: 'search'
    },
    /* 组件的状态 */
    status: {
      type: String,
      value: 'loading'
    },
    /* `暂无数据`状态显示的文案 */
    emptyTxt: {
      type: String,
      value: '暂无数据'
    },
    /* `加载中`状态显示的文案 */
    loadingTxt: {
      type: String,
      value: '正在加载'
    },
    /* `没有更多数据了`状态显示的文案 */
    nomoreTxt: {
      type: String,
      value: '没有更多数据了'
    }
  }
})