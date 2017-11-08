import WeAppComponent from '../weappComponent';

class Loader extends WeAppComponent {
  static defaultOptions = {
    id: 'WeApp_Loader',
    iconType: 'search',
    status: 'loading',// loading, nomore, empty
    emptyTxt: '暂无数据',
    loadingTxt: '正在加载',
    noMoreTxt: '没有更多数据了'
  }
  constructor(pageScope, options) {
    super(pageScope, Object.assign({}, Loader.defaultOptions, options));

    this.initData();
  }
  /**
   * 初始化数据
   */
  initData() {
    this.pageScope.setData({
      [this.options.id]: this.options
    });
  }
  setStatus(status) {
    let componentData = this._componentData_(this);
    
    componentData.status = status || '';

    this._componentData_(this, componentData);
  }
}

module.exports = Loader;